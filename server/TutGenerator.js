const path = require('path')
const XLSX = require('xlsx')
// import pd from 'pretty-data';
const pd = require('pretty-data').pd;

function MyTutFunction(xlsxJSON) {
    var options = { indentation: '  ', stripComments: true, collapseContent: true };

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

    for (let arrEle of xlsxJSON) {
        // var m = 0;
        try {
            if (typeof arrEle.A !== "number") {
                if (arrEle.A.includes('Error Table')) {
                    // console.log("HI");
                    var qType = arrEle.C.toUpperCase();
                    // var tGroup = arrEle.B;
                    if ("D" in arrEle && typeof arrEle.D == "string") {
                        var forFib1 = arrEle.D;
                        if (typeof arrEle.D !== "number") {
                            var forFib2 = forFib1.replace(/\s/g, '');
                            var refFib = forFib2.split(',');
                        }
                    }
                    if ("D" in arrEle && typeof arrEle.D == "number") {
                        refFib = arrEle.D;
                    }
                }

                if (arrEle.A.includes('Tutelage ID')) {
                    tutXml = `<tutelage_tmpl name="${arrEle.B}">`;
                    tutRef = `<tutelage_ref name="${arrEle.B}">`;
                    // console.log(tutXml);
                    tutID = arrEle.B;
                }

                if (arrEle.A.includes('Tutelage Variables') && "B" in arrEle) {
                    // console.log(arrEle.A)
                    var varSpace = arrEle.B;
                    var varSpace1 = varSpace.replace(/\s/g, '');
                    var tutVar = varSpace1.split(',');
                    param = `<params>`
                    for (let x of tutVar) {
                        param += `<param name="${x}" type="int"/>`;
                        refParam += `<bind name="${x}" val="${x}"/>`;
                    }
                    param += `</params>`
                }
                // refParam += `</tutelage_ref>`;
            }
        }
        // }
        catch (err) {
            console.log(err);
        }
    }
    // tutXml += `</tutelage_tmpl>`
    // var final = pd.xml(tutXml);
    // console.log(final);
    return `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType, tutID)}</tutelage_tmpl>`;
    // return `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType, tutID)}</tutelage_tmpl>${tutRef}${refParam}</tutelage_ref>`;
    // var final = `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType)}</tutelage_tmpl>${tutRef}${refParam}</tutelage_ref> `;
    // return pd.xml(final);
}

function feedBack(arrJSON, ref, qType, tutID) {
    var ret = '';
    for (let arr of arrJSON) {
        if (qType == "FIB" && "E" in arr) {
            // var ret = await fibTutelageTemplate(arr, refFib);
            ret += `${fibTutelageTemplate(arr, ref)}`;
            // console.log(pd.xml(ret));
            // tutXml += ret;
            // tutXml = `${tutXml}${ret}`;
        }
        if (qType == 'MCQ' && "E" in arr) {
            ret += `${mcqTutelageTemplate(arr)}`;
        }
        if (qType == 'MANS' && "E" in arr) {
            ret += `${mansTutelageTemplate(arr)}`;
        }
        if (qType == 'FIB/MCQ' && "E" in arr && tutID.includes('M', 0)) {
            console.log('Valid');
            ret += `${mcqTutelageTemplate(arr)}`;
        }
        if (qType == 'FIB/MCQ' && "E" in arr && !tutID.includes('M', 0)) {
            ret += `${fibTutelageTemplate(arr, ref)}`;
        }
        if (qType == 'SLOT' && "E" in arr) {
            ret += `${slotTutelageTemplate(arr)}`;
        }
        if (qType == 'NBL' && "E" in arr) {
            ret += `${nblTutelageTemplate(arr)}`;
        }
        if (qType == 'ARR' && "E" in arr) {
            ret += `${arrTutelageTemplate(arr)}`;
        }
        if (qType == 'AWS' && "E" in arr) {
            ret += `${awsTutelageTemplate(arr)}`;
        }
        if (qType == 'BOX' && "E" in arr) {
            ret += `${boxTutelageTemplate(arr)}`;
        }
        if (qType == 'TAPE' && "E" in arr) {
            ret += `${tapeTutelageTemplate(arr)}`;
        }
        if (qType == 'BS' && "E" in arr) {
            ret += `${bsTutelageTemplate(arr)}`;
        }
        if (qType == 'BG' && "E" in arr) {
            ret += `${bgTutelageTemplate(arr)}`;
        }
        if (qType == 'LP' && "E" in arr) {
            ret += `${lpTutelageTemplate(arr)}`;
        }
    }
    return ret;
}


function fibTutelageTemplate(arrEle, refFib) {
    var xml = '';
    if (arrEle.B !== "NA") {
        xml += `<feedback name="${arrEle.B}"><trigger>`
        if (arrEle.A === "Other" || arrEle.B === "_UNCOMMON") {
            xml = xml.replace("<trigger>", "");
            return `${xml}</feedback>`;
        }
        else if (typeof arrEle.A === "number") {
            xml += `<cond><fib_ref name="fib${refFib}"/>==${arrEle.A}</cond>`;
            return `${xml}</trigger></feedback>`;
        }
        else if (typeof refFib === "number" && !arrEle.A.includes(",") && !arrEle.A.includes("FIB")) {
            xml += `<cond><fib_ref name="fib${refFib}"/>==${arrEle.A}</cond>`;
            return `${xml}</trigger></feedback>`;
        }
        else if (!arrEle.A.includes(",") && arrEle.A.includes("FIB")) {
            arrEle.A = arrEle.A.replace(/\s/g, '');
            arrEle.A = arrEle.A.replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
            xml += `<cond>${arrEle.A}</cond>`;
            return `${xml}</trigger></feedback>`;
        }
        else if (arrEle.A.includes(",")) {
            let fibVal = arrEle.A.replace(/\s/g, '');
            let fibEle = fibVal.split(',');
            // console.log(fibEle);
            if (typeof refFib == "number") {
                if (!fibEle[0].search("fib")) {
                    xml += `<cond><fib_ref name="fib${refFib}"/>==${fibEle[0]}</cond>`
                }
                else {
                    fibEle[0] = fibEle[0].replace(/\s/g, '');
                    fibEle[0] = fibEle[0].replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
                    xml += `<cond>${fibEle[0]}</cond>`;
                }
                for (var i = 1; i < fibEle.length; i++) {
                    fibEle[i] = fibEle[i].replace(/\s/g, '');
                    fibEle[i] = fibEle[i].replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
                    xml += `<cond>${fibEle[i]}</cond>`;
                }
            }
            else {
                for (let i = 0; i < fibEle.length; i++) {
                    if (i < refFib.length && !fibEle[i].includes("FIB")) {
                        if (!fibEle[i].includes("Other")) {
                            xml += `<cond><fib_ref name="fib${refFib[i]}"/>==${fibEle[i]}</cond>`
                        }
                        else if (fibEle[i].includes("Other")) {
                            var matches = fibEle[i].match(/\[(.*?)\]/);
                            if (matches != null) {
                                xml += `<cond><fib_ref name="fib${refFib[i]}"/>!=${matches[1]}</cond>`
                            }
                        }
                    }
                    else {
                        fibEle[i] = fibEle[i].replace(/\s/g, '');
                        fibEle[i] = fibEle[i].replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
                        xml += `<cond>${fibEle[i]}</cond>`;
                    }
                }
            }

            return `${xml}</trigger></feedback>`;
        }
    }
    else {
        return '';
    }
}

//
function mcqTutelageTemplate(arrEle) {
    var xml = '';
    if (arrEle.B !== "NA") {
        xml += `<feedback name = "${arrEle.B}"><trigger><cond><choice_ref name ="${arrEle.A}"/>==1</cond>`
        // console.log("Function", xml);
        return `${xml}</trigger></feedback>`;
    }
    else {
        return '';
    }
    // xml += `</trigger></feedback>`;
}
function mansTutelageTemplate(arrEle) {
    var xml = '';
    if (arrEle.B !== "NA") {
        if (arrEle.A === "Other" || arrEle.B === "_UNCOMMON") {
            xml = `<feedback name="${arrEle.B}">`;
            return `${xml}</feedback>`;
        }
        else {
            let mansVal = arrEle.A.replace(/\s/g, '');
            let mansEle = mansVal.split(',');
            xml += `<feedback name = "${arrEle.B}"><trigger>`;
            for (let i = 0; i < mansEle.length; i++) {
                xml += `<cond><choice_ref name ="C${i + 1}"/>==${mansEle[i]}</cond>`;
            }
            // console.log("Function", xml);
            return `${xml}</trigger></feedback>`;
        }

    }
    else {
        return '';
    }
    // xml += `</trigger></feedback>`;
}

function slotTutelageTemplate(arrEle) {
    var xml = '';
    if (arrEle.B !== "NA") {
        if (arrEle.A === "Other" || arrEle.B === "_UNCOMMON") {
            xml = `<feedback name="${arrEle.B}">`;
            return `${xml}</feedback>`;
        }
        else {
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
            xml += `<feedback name = "${arrEle.B}"><trigger><cond>!<slot_ref name="${slotVar[0].replace(/\s/g, '')}"/>.contains("${slotVar[1].replace(/\s/g, '')}")</cond>`
            // console.log("Function", xml);
            return `${xml}</trigger></feedback>`;
        }
    }
    else {
        return '';
    }
    // xml += `</trigger></feedback>`;
}
function bsTutelageTemplate(arrEle) {
    var xml = '';
    if (arrEle.B !== "NA" && arrEle.A !== "Other") {
        // var slotVar = arrEle.A.split('≠');
        // <boxing_shading_ref name="shading1"/>==4
        xml += `<feedback name = "${arrEle.B}"><trigger><cond><boxing_shading_ref name="shading1"/>==${arrEle.A}</cond>`
        // console.log("Function", xml);
        return `${xml}</trigger></feedback>`;
    }
    else if (arrEle.A == "Other") {
        xml += `<feedback name = "${arrEle.B}">`
        console.log("Function", xml);
        return `${xml}</feedback>`;
    }
    else {
        return '';
    }
    // xml += `</trigger></feedback>`;
}

function nblTutelageTemplate(arrEle) {
    var xml = '';
    if (arrEle.B !== "NA" && arrEle.A !== "Other") {
        xml += `<feedback name = "${arrEle.B}"><trigger><cond><number_line_ref name="nbl1"/>.containsExactly("${arrEle.A}")</cond>`
        console.log("Function", arrEle.A);
        return `${xml}</trigger></feedback>`;
    }
    else if (arrEle.A == "Other") {
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
    if ("E" in arrEle) {
        if (arrEle.B !== "NA" && arrEle.A !== "Other") {
            var y1 = arrEle.A.replace(/\s/g, '');
            var z = y1.split(/[,;=]/);
            console.log(z);
            if (z[0].includes("group")) {
                xml += `<feedback name="${arrEle.B}"><trigger><cond><boxing_ref name="Boxing1" field="group"/>== ${z[1]}</cond><cond><boxing_ref name="Boxing1" field="size"/>== ${z[3]}</cond></trigger></feedback>`
                console.log(xml);
            }
            else if (z[2].includes("group")) {
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
    if ("E" in arrEle) {
        if (arrEle.B !== "NA" && arrEle.A !== "Other") {
            var y1 = arrEle.A.replace(/\s/g, '');
            var z = y1.split(/[,;=]/);
            console.log(z);
            if (z[0].includes("row")) {
                xml += `<feedback name="${arrEle.B}"><trigger><cond><array_ref name="Array1" field="row"/>== ${z[1]}</cond><cond><array_ref name="Array1" field="column"/>== ${z[3]}</cond></trigger></feedback>`
                console.log(xml);
            }
            else if (z[2].includes("row")) {
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

function awsTutelageTemplate(arrEle) {
    var xml = '';
    if ("E" in arrEle) {
        if (arrEle.B !== "NA" && arrEle.A !== "Other") {
            var y1 = arrEle.A.replace(/\s/g, '');
            var z = y1.split(/[,;=]/);
            console.log(z);
            if (z[0].includes("row")) {
                xml += `<feedback name="${arrEle.B}"><trigger><cond><boxing_array_ref name="BoxArr1"/>.row== ${z[1]}</cond><cond><boxing_array_ref name="BoxArr1"/>.column== ${z[3]}</cond></trigger></feedback>`
                console.log(xml);
            }
            else if (z[2].includes("row")) {
                xml += `<feedback name="${arrEle.B}"><trigger><cond><boxing_array_ref name="BoxArr1"/>.row== ${z[3]}</cond><cond><boxing_array_ref name="BoxArr1"/>.column== ${z[1]}</cond></trigger></feedback>`
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

function tapeTutelageTemplate(arrEle) {
    var xml = '';
    // var xml = '';
    if ("E" in arrEle) {
        if (arrEle.B !== "NA" && arrEle.A !== "Other") {
            var y1 = arrEle.A.replace(/\s/g, '');
            var z = y1.split(/[,;=]/);
            console.log(z);
            let a = `"${z[3]}"`,
                k = [],
                b = parseInt(z[1]);
            while (b > 0) {
                k.push(a);
                --b;
            }
            xml += `<feedback name="${arrEle.B}"><trigger><cond><tape_ref name="tape1"/>.inOrder(${k.toString()})</cond></trigger></feedback>`

        }
        if (arrEle.B !== "NA" && arrEle.A == "Other") {
            xml += `<feedback name="${arrEle.B}"></feedback>`
            console.log(xml);
        }
    }
    return xml;

}

function bgTutelageTemplate(arrEle) {
    var xml = '';
    if ("E" in arrEle) {
        if (arrEle.B !== "NA" && arrEle.A !== "Other") {
            xml = `<feedback name="${arrEle.B}"><trigger>`
            var y1 = arrEle.A.replace(/\s/g, '');
            var z = y1.split("||");
            xml += `<cond>`;
            for (let i = 0; i < z.length; i++) {
                var be = z[i].split("≠");
                console.log(be);
                xml += `(<bar_ref name="bar1"/>.columnHeightAtXIndex(${be[0]})!=${be[1]})`;
                if (i !== (z.length - 1)) {
                    xml += ` || `;
                }
            }
            console.log(xml);
            xml += `</cond></trigger></feedback>`;
        }
        if (arrEle.A.includes("Other")) {
            xml += `<feedback name="${arrEle.B}"></feedback>`
            console.log(xml);
        }
    }
    return xml;
}

function lpTutelageTemplate(arrEle) {
    var xml = '';
    if ("E" in arrEle) {
        if (arrEle.B !== "NA" && arrEle.A !== "Other") {
            xml = `<feedback name="${arrEle.B}"><trigger>`
            var y1 = arrEle.A.replace(/\s/g, '');
            var z = y1.split("||");
            xml += `<cond>`;
            for (let i = 0; i < z.length; i++) {
                var be = z[i].split("≠");
                console.log(be);
                xml += `(<line_plot_ref name="lp1"/>.columnCountAtXIndex(${be[0]})!=${be[1]})`;
                if (i !== (z.length - 1)) {
                    xml += ` || `;
                }
            }
            console.log(xml);
            xml += `</cond></trigger></feedback>`;
        }
        if (arrEle.A.includes("Other")) {
            xml += `<feedback name="${arrEle.B}"></feedback>`
            console.log(xml);
        }
    }
    return xml;
}

module.exports = MyTutFunction;