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
         console.log(pd.xml(xml));
         tuteXml += tutelageFunction(xlsxJSON);
      }
      return res.send(
          // tuteXml
          pd.xml(tuteXml)
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
  var param = '';
  var refParam = '';
  var tutID = '';


  questionObj['prob_tmp_name'] = 'zzzzzz';

  for(let arrEle of xlsxJSON) {
    // var m = 0;
    try {
      if(arrEle.A.includes('Error Table')) {
        // console.log("HI");
        var qType = arrEle.C.toUpperCase();
        // var tGroup = arrEle.B;
        if("D" in arrEle && typeof arrEle.D == "string") {
          var forFib1 = arrEle.D;
          if(typeof arrEle.D !== "number") {
            var forFib2 = forFib1.replace(/\s/g,'');
            var refFib = forFib2.split(',');
          }
        }
        if("D" in arrEle && typeof arrEle.D == "number") {
          refFib = arrEle.D;
        }
      }

    	if(arrEle.A.includes('Tutelage ID')) {
        tutXml = `<tutelage_tmpl name="${arrEle.B}">`;
        tutRef = `<tutelage_ref name="${arrEle.B}">`;
        // console.log(tutXml);
        tutID = arrEle.B;
      }

      if(arrEle.A.includes('Tutelage Variables') && "B" in arrEle) {
        // console.log(arrEle.A)
        var varSpace = arrEle.B;
        var varSpace1 = varSpace.replace(/\s/g,'');
        var tutVar = varSpace1.split(',');
        param = `<params>`
        for(let x of tutVar) {
          param += `<param name="${x}" type="int"/>`;
          refParam += `<bind name="${x}" val="${x}"/>`;
        }
        param += `</params>`
      }
      // refParam += `</tutelage_ref>`;
    }
    // }
    catch(err) {
      console.log(err);
    }
  }
  // tutXml += `</tutelage_tmpl>`
  // var final = pd.xml(tutXml);
  // console.log(final);
  return `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType, tutID)}</tutelage_tmpl>${tutRef}${refParam}</tutelage_ref>`;
  // var final = `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType)}</tutelage_tmpl>${tutRef}${refParam}</tutelage_ref> `;
  // return pd.xml(final);
}

function feedBack(arrJSON, ref, qType, tutID) {
  var ret = '';
  for(let arr of arrJSON) {
    if(qType == "FIB" && "E" in arr) {
      // var ret = await fibTutelageTemplate(arr, refFib);
      ret += `${fibTutelageTemplate(arr, ref)}`;
      // console.log(pd.xml(ret));
      // tutXml += ret;
      // tutXml = `${tutXml}${ret}`;
    }
    if(qType == 'MCQ' && "E" in arr) {
      ret += `${mcqTutelageTemplate(arr)}`;
      // console.log(pd.xml(ret));
      // tutXml += ret;
      // tutXml = `${tutXml}${ret}`;
    }
    if(qType == 'FIB/MCQ' && "E" in arr && tutID.includes('M',0)) {
      console.log('Valid');
      ret += `${mcqTutelageTemplate(arr)}`;
    }
    if(qType == 'FIB/MCQ' && "E" in arr && !tutID.includes('M',0)) {
      ret += `${fibTutelageTemplate(arr, ref)}`;
    }
    if(qType == 'SLOT' && "E" in arr) {
      ret += `${slotTutelageTemplate(arr)}`;
    }
    if(qType == 'NBL' && "E" in arr) {
      ret += `${nblTutelageTemplate(arr)}`;
    }
    if(qType == 'ARR' && "E" in arr) {
      ret += `${arrTutelageTemplate(arr)}`;
    }
    if(qType == 'BOX' && "E" in arr) {
      ret += `${boxTutelageTemplate(arr)}`;
    }


  }
  return ret;
}


function fibTutelageTemplate(arrEle, refFib) {
  var xml = '';
  // console.log("In Function",arrEle);
  // for(let arrEle of xlsxJSON) {
    // if("E" in arrEle && arrEle.B !== "NA") {
    if(arrEle.B !== "NA") {
      xml += `<feedback name="${arrEle.B}"><trigger>`
      if (arrEle.A !== "Other") {
        if(typeof arrEle.A !== "number") {
          // var y = arrEle.A.tostring();
          var y1 = arrEle.A.replace(/\s/g,'');
          var z = y1.split(/[,;]/);
          // console.log(z);
        }
        if(typeof z !== "undefined") {
          // console.log("BUG",z);
          if(z.length >= 2) {
            if(typeof refFib == "object" && typeof z == "object") {
              for(var i = 0; i < z.length; i++) {
                if(i < refFib.length) {
                  if(!z[i].includes("Other")) {
                  xml += `<cond><fib_ref name="fib${refFib[i]}"/>==${z[i]}</cond>`
                  }
                  else if(z[i].includes("Other")) {
                    var matches = z[i].match(/\[(.*?)\]/);
                    // console.log(typeof matches,"AAAAAA");
                    if(matches != null) {
                      xml += `<cond>!<fib_ref name="fib${refFib[i]}"/>==${matches[1]}</cond>`
                    }
                  }
                }
                else {
                  xml += `<cond>${z[i]}</cond>`
                }
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
        return `${xml}</trigger></feedback>`;
      }
      else {
        return `${xml}</trigger></feedback>`;
      }
    }
    else {
      return '';
    }
  // }
  // xml += `</trigger></feedback>`;
  // console.log("Function", xml);
}

//
function mcqTutelageTemplate(arrEle) {
  var xml = '';
  if(arrEle.B !== "NA") {
    xml += `<feedback name = "${arrEle.B}"><trigger><cond><choice_ref name ="${arrEle.A}"/>==1</cond>`
  // console.log("Function", xml);
  return `${xml}</trigger></feedback>`;
  }
  else {
    return '';
  }
  // xml += `</trigger></feedback>`;
}

function slotTutelageTemplate(arrEle) {
  var xml = '';
  if(arrEle.B !== "NA") {
    var slotVar = arrEle.A.split('≠');
    // var slotVar1 = slotVar[1].split(',');
    // var slotVarR = '';
    // if(typeof slotVar1 == "object") {
    //
    //   for (let slotEle in slotVar1) {
    //     slotVarR +=
    //   }
    // }
    // for (let slotEle in slotVarR) {
    //   slotVarR +=
    // }
    xml += `<feedback name = "${arrEle.B}"><trigger><cond>!<slot_ref name="${slotVar[0].replace(/\s/g,'')}"/>.contains("${slotVar[1].replace(/\s/g,'')}")</cond>`
  // console.log("Function", xml);
  return `${xml}</trigger></feedback>`;
  }
  else {
    return '';
  }
  // xml += `</trigger></feedback>`;
}

function nblTutelageTemplate(arrEle) {
  var xml = '';
  if(arrEle.B !== "NA" && arrEle.A !== "Other") {
    xml += `<feedback name = "${arrEle.B}"><trigger><cond>!<number_line_ref name="nbl1"/>.contains("${arrEle.A}")</cond>`
  console.log("Function", arrEle.A);
  return `${xml}</trigger></feedback>`;
  }
  else if(arrEle.A == "Other") {
    xml += `<feedback name = "${arrEle.B}">`
    console.log("Function", xml);
  return `${xml}</feedback>`;
  }
  else {
    return '';
  }
  // xml += `</trigger></feedback>`;
}
function boxTutelageTemplate(arrEle) {
  var xml = '';
  var xml = '';
  if("E" in arrEle) {
    if(arrEle.B !== "NA" && arrEle.A !== "Other"){
      var y1 = arrEle.A.replace(/\s/g,'');
      var z = y1.split(/[,;=]/);
      console.log(z);
      if(z[0].includes("group")) {
        xml += `<feedback name="${arrEle.B}"><trigger><cond><boxing_ref name="Boxing1" field="group"/>== ${z[1]}</cond><cond><boxing_ref name="Boxing1" field="size"/>== ${z[3]}</cond></trigger></feedback>`
        console.log(xml);
      }
      else if(z[2].includes("group")) {
        xml += `<feedback name="${arrEle.B}"><trigger><cond><boxing_ref name="Boxing1" field="group"/>== ${z[3]}</cond><cond><boxing_ref name="Boxing1" field="size"/>== ${z[1]}</cond></trigger></feedback>`
        console.log(xml);
      }
    }
    if (arrEle.B !== "NA" && arrEle.A == "Other") {
      xml += `<feedback name="${arrEle.B}"></feedback>`
      console.log(xml);
    }
  }
  return xml;

}
function arrTutelageTemplate(arrEle) {
  var xml = '';
  if("E" in arrEle) {
    if(arrEle.B !== "NA" && arrEle.A !== "Other"){
      var y1 = arrEle.A.replace(/\s/g,'');
      var z = y1.split(/[,;=]/);
      console.log(z);
      if(z[0].includes("row")) {
        xml += `<feedback name="${arrEle.B}"><trigger><cond><array_ref name="Array1" field="row"/>== ${z[1]}</cond><cond><array_ref name="Array1" field="column"/>== ${z[3]}</cond></trigger></feedback>`
        console.log(xml);
      }
      else if(z[2].includes("row")) {
        xml += `<feedback name="${arrEle.B}"><trigger><cond><array_ref name="Array1" field="row"/>== ${z[3]}</cond><cond><array_ref name="Array1" field="column"/>== ${z[1]}</cond></trigger></feedback>`
        console.log(xml);
      }
    }
    if (arrEle.B !== "NA" && arrEle.A == "Other") {
      xml += `<feedback name="${arrEle.B}"></feedback>`
      console.log(xml);
    }
  }
  return xml;
}

app.get('*', (req, res)=>{
  res.send('My web page');
})

const PORT = process.env.PORT || 3000
app.listen(PORT);
