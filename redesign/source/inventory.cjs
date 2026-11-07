const fs=require('fs'),path=require('path');
const base='C:/Users/Leviç/.codex/generated_images/01a1b699-e020-7e91-a307-bce3b5a1427e';
const scenes={
'00211827':['Consulta patrimonial con tres personas','faces'],
'009edd80':['Abogado revisando expediente en oficina de cristal','faces'],
'1c75f72a':['Retrato masculino ante arco y olivo','rural'],
'3841da92':['Familia caminando junto a casa rural','rural'],
'435ea148':['Manos en consulta ante ventana de piedra y flores','rural'],
'466ae5fa':['Abogada con pareja en oficina de cristal','faces'],
'5363ca75':['Consulta sobre accidente con abogado canoso','faces'],
'5924b0a7':['Consulta con abogados ficticios en despacho rústico','ruralfaces'],
'6192d56d':['Terraza de casa rural con olivo','rural'],
'61b7ec17':['Retrato regenerado de Jesús en su escritorio','jesus'],
'6272d9ee':['Retrato regenerado de África en su escritorio','africa'],
'6a604ba5':['Carretera costera vista desde vehículo','outdoor'],
'72ceb3df':['Manos asesorando sobre contrato en oficina moderna','asesoramiento'],
'92614a4e':['Consulta de extranjería con abogada ficticia','faces'],
'b095261c':['Abogados ficticios revisando plano inmobiliario','faces'],
'dac5013b':['Abogado ficticio revisando expediente con colegas al fondo','faces'],
'db99ddf6':['Reunión de cuatro profesionales ficticios en oficina','faces'],
'dec5de36':['Exterior de edificio judicial clásico','outdoor'],
'e060bb47':['Carpeta y pluma en escritorio de estilo rústico','rural'],
'ea45a604':['Dos abogados ficticios revisando portátil','faces'],
'ebb1f4d8':['Retrato femenino ante arco y olivo','rural']
};
const reasons={faces:'Rostros de abogados distintos de las fotografías originales de Jesús y África.',rural:'Estética rústica descartada por el usuario.',ruralfaces:'Estética rústica y rostros de abogados distintos de las referencias.',outdoor:'Escena exterior, no cumple la dirección de oficina corporativa.',jesus:'Conserva visualmente rostro, vestimenta y composición de la foto original. Apto como retrato del equipo.',africa:'Conserva visualmente rostro, vestimenta y composición de la foto original. Apto como retrato del equipo.',asesoramiento:'Oficina corporativa moderna y solo manos; no presenta abogados con rostros ficticios.'};
const result=[];
for(const file of fs.readdirSync(base).filter(x=>x.endsWith('.png'))){const key=file.split('-').slice(1,2)[0];if(!scenes[key])continue;const [scene,type]=scenes[key],usable=['jesus','africa','asesoramiento'].includes(type),bytes=fs.readFileSync(path.join(base,file));const dimensions={width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};let copiedTo=null;if(usable){const dest=path.resolve(__dirname,'../dist/assets/'+type+'.png');if(!fs.existsSync(dest)){fs.copyFileSync(path.join(base,file),dest);copiedTo=dest}else copiedTo='Destino ya existente; no sobrescrito';}result.push({file:path.join(base,file),usable,scene,reason:reasons[type]+' Resolución nativa inferior a 4K.',dimensions,is4K:dimensions.width>=3840&&dimensions.height>=2160,copiedTo})}
fs.writeFileSync(path.resolve(__dirname,'../asset-inventory.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({reviewed:result.length,usable:result.filter(x=>x.usable).map(x=>x.copiedTo)}));
