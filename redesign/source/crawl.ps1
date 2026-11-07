$ErrorActionPreference='Stop'
$base='https://www.abogadosfuengirola.org'
$queue=[System.Collections.Generic.Queue[string]]::new()
$queue.Enqueue('/')
if(Test-Path 'redesign/source/sitemap.xml'){
 foreach($m in [regex]::Matches((Get-Content 'redesign/source/sitemap.xml' -Raw),'<loc>\s*([^<]+)\s*</loc>')){$queue.Enqueue(([Uri]$m.Groups[1].Value.Trim()).AbsolutePath)}
}
$seen=@{}
$records=@()
while($queue.Count -gt 0 -and $seen.Count -lt 100){
 $path=$queue.Dequeue()
 if($seen.ContainsKey($path)){continue}
 $seen[$path]=$true
 $name=if($path -eq '/'){'home'}else{($path.Trim('/') -replace '[^a-zA-Z0-9_-]','_')}
 try {
  if(Test-Path "redesign/source/$name.html"){ $html=Get-Content "redesign/source/$name.html" -Raw }else{
   $r=Invoke-WebRequest ($base+$path) -TimeoutSec 30
   $html=$r.Content
   [IO.File]::WriteAllText((Join-Path $PWD "redesign/source/$name.html"),$html)
  }
  $records+=@{url=$base+$path;path=$path;file="$name.html"}
  foreach($m in [regex]::Matches($html,'href=["'']([^"''#?]+)["'']')){
   $link=$m.Groups[1].Value
   if($link -match '^(mailto:|tel:|javascript:|https?://(?!www\.abogadosfuengirola\.org))'){continue}
   $u=[Uri]::new([Uri]($base+$path),$link)
   $p=$u.AbsolutePath.TrimEnd('/')
   if(!$p){$p='/'}
   if($p -match '\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|pdf|woff2?|xml|txt)$'){continue}
   if($p -match '/(images|css|js|demos|fonts)/'){continue}
   if(!$seen.ContainsKey($p)){$queue.Enqueue($p)}
  }
  Write-Output "$path OK"
 }catch{Write-Output "$path ERROR $($_.Exception.Message)"}
}
$records | ConvertTo-Json -Depth 10 | Set-Content 'redesign/source/pages-index.json' -Encoding utf8
foreach($asset in @('css/style.css','demos/Pellets/pellets.css')){
 Invoke-WebRequest ($base+'/'+$asset) -OutFile ('redesign/source/'+($asset -replace '/','_'))
}
