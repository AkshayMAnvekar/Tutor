import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import formidable from 'formidable';
import XLSX from 'xlsx';
// import pd from 'pretty-data';
const pd = require('pretty-data').pd;



const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const CURRENT_WORKING_DIR = process.cwd();

app.use(express.static(path.join(CURRENT_WORKING_DIR, 'public')));

app.get('/test', (req, res)=>{
      res.send('My page');
})
app.get('/test1', (req, res)=>{
      res.send('My page 2');
})
app.get('/getfile', (req, res)=>{
      console.log(req.query)
      res.send('My page 2');
})
app.post('/getfile', (req, res)=>{
  new formidable.IncomingForm().parse(req)
	    .on('file', function(name, file) {
			let workbook = XLSX.readFile(`${file.path}`);
      let xlsxJSON = '';
      let tuteXml = '';
      // console.log(workbook)
			let sheet_name_list = workbook.SheetNames;
      for(let x of sheet_name_list){
         xlsxJSON = XLSX.utils.sheet_to_json(workbook.Sheets[x], {defVal:""});
         console.log(xlsxJSON);
         let xml = tutelageFunction(xlsxJSON);
         console.log(xml);
         tuteXml += tutelageFunction(xlsxJSON);
      }
      return res.send(
          tuteXml
          // pd.xml(tuteXml)
      )
	    });

})

function tutelageFunction(xlsxJSON) {
  var options = {indentation: '  ', stripComments: true, collapseContent: true};

  var questionObj = {};
  var arrayOfTemplateIdsCols = [];
  var feedbacks = 0;
  questionObj['paramsArr'] = [];
  var tutXml = '';
  var tutRef = '';


  questionObj['prob_tmp_name'] = 'zzzzzz';

  for(let arrEle of xlsxJSON) {
    // var m = 0;
    if(arrEle.A.includes('Error Table')) {
      // console.log("HI");
      var qType = arrEle.C;
      // var tGroup = arrEle.B;
      if("D" in arrEle && typeof arrEle.D == "string") {
        var forFib1 = arrEle.D;
        var forFib2 = forFib1.replace(/\s/g,'');
        var refFib = forFib2.split(',');
      }
      if("D" in arrEle && typeof arrEle.D == "number") {
        refFib = arrEle.D;
      }
    }

  	if(arrEle.A.includes('Tutelage ID')) {
      tutXml = `<tutelage_tmpl name="${arrEle.B}">`;
      tutRef = `<tutelage_ref name="${arrEle.B}">`;
      // console.log(tutXml);
    }

    if(arrEle.A.includes('Tutelage Variables') && "B" in arrEle) {
      // console.log(arrEle.A)
      var varSpace = arrEle.B;
      var varSpace1 = varSpace.replace(/\s/g,'');
      // console.log(varSpace);
      var tutVar = varSpace1.split(',');
      tutXml += `<params>`
      for(let x of tutVar) {
        tutXml += `<param name="${x}" type="int"/>`;
        tutRef += `<bind name="${x}" val="${x}"/>`;
      }
      tutXml += `</params>`
      tutRef += `</tutelage_ref>`;
    }

    if(qType == "FIB" && "E" in arrEle) {
      // var ret = await fibTutelageTemplate(arrEle, refFib);
      var ret = fibTutelageTemplate(arrEle, refFib);
      // console.log(pd.xml(ret));
      tutXml = `${tutXml}${ret}`;
    }
    if(qType == 'MCQ' && "E" in arrEle) {
      var ret = mcqTutelageTemplate(arrEle);
      // console.log(pd.xml(ret));
      tutXml = `${tutXml}${ret}`;
    }

    // }
  }
  // console.log(pd.xml(tutRef));
  tutXml += `</tutelage_tmpl>`
  // console.log(tutXml, "END");
  var final = pd.xml(tutXml);
  // console.log(final);
  return `${tutXml}${tutRef}`;
}


function fibTutelageTemplate(arrEle, refFib) {
  var xml = '';
  // console.log("In Function",arrEle);
  // for(let arrEle of xlsxJSON) {
    // if("E" in arrEle && arrEle.B !== "NA") {
    if(arrEle.B !== "NA") {
      xml += `<feedback name="${arrEle.B}"><trigger>`
      var y = arrEle.A.replace(/\s/g,'');
      var z = y.split(/[,;]/);
      if(z.length >= 2) {
        if(typeof refFib == "object" && typeof z == "object") {
          for(var i = 0; i < z.length; i++) {
            if(i < refFib.length) {
              xml += `<cond><fib_ref name="fib${refFib[i]}"/>==${z[i]}</cond>`
            }
            else {
              xml += `<cond>${z[i]}</cond>`
            }
          }
        }
        if(typeof refFib == "number" && typeof z == "object"){
          xml += `<cond><fib_ref name="fib${refFib}"/>==${z[0]}</cond>`
          for(var i = 1; i < z.length; i++) {
            xml += `<cond>${z[i]}</cond>`
          }
        }
      }
      else if(typeof refFib == "number"){
        xml += `<cond><fib_ref name="fib${refFib}"/>==${z}</cond>`
      }
      else {
        xml += `<cond>${z}</cond>`
      }
    }
  // }
  xml += `</trigger></feedback>`;
  // console.log("Function", xml);
  return xml;
}

//
function mcqTutelageTemplate(arrEle) {
  var xml = '';
  if(arrEle.B !== "NA") {
    xml += `<feedback name = "${arrEle.B}"><trigger><cond><choice_ref name ="${arrEle.A}"/>==1</cond>`
    xml += `</trigger></feedback>`;
  // console.log("Function", xml);
  }
  return xml;
}

app.get('*', (req, res)=>{
  res.send('My web page');
})

const PORT = process.env.PORT || 3000
app.listen(PORT);
