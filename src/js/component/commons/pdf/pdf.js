import React, { Component } from 'react';
import Base64 from 'base-64';
import Api from '../../libs/Api';


class ChartsAction extends Component {
    constructor(props) {
        super(props);
          const data = JSON.parse(localStorage.getItem('pdf'));
          this.state = {
            name: data ? data.name : '',
            filterpart: data ? data.filterpart : '',
            // html: `<!DOCTYPE html>\n<html>\n<head>\n\t<title>Certificate</title>\n</head>\n<body>\n<div >\n<div style=\"text-align: left;margin-top: 40px\"><img src=/logo.png alt=\"pall logo\" /></div>\n<p style=\"font-size: 25px;text-align: center;font-weight: bold;\">Certificate of Integrity Test Parameters</p>\n\n<div>\n<div style=\"font-weight: bold;\">Issued for:</div>\n<div>John</div>\n</div>\n\n<p style=\"font-weight: bold;\">Date of Issue: 10/31/2017</p>\n\n<div style=\"text-align: center;margin-top: 80px;font-weight: bold;text-decoration: underline;\"><p>Forward Flow Test Parameters</p></div>\n\n<table style=\" border: 1px solid black;border-collapse: collapse;width:100%;text-align: center;\">\n <tr style=\" border: 1px solid black;\">\n <th style=\"border-right: 1px solid black;\">Filter Part Number</th>\n <th>Wetting Fluid</th>\n <th style=\"border-right: 1px solid black;\"> Maximum Allowable Forward Flow for Air </th><th style=\"border-right: 1px solid black;\"> Test Pressure </th>\n </tr>\n <tr style=\" border: 1px solid black;\">\n <td style=\"border-right: 1px solid black;\">AVF021V002PV</td>\n <td>70/30 ETHANOL/WATER</td>\n <td style=\"border-right: 1px solid black;\">2.9</td><td style=\"border-right: 1px solid black;\">86.0</td>\n </tr>\n \n</table>\n\n<p>The integrity test values in the table above apply to a test temperature of 20 ± 5°C with compressed air as the pressure source. During the test period the temperature of the filter assembly should not vary more than ± 1°C.</p>\n\n\n<div style=\"text-decoration: underline;\"></div>\n<div style=\"text-decoration: underline;\"></div>\n\n<p style=\"margin: 40px 0 30px 0;text-decoration: underline;\">Created, Signed and Saved by : ITVCert SLS </p>\n\n\n<div style=\"margin-top: 20px;font-weight: bold;text-decoration: underline;\">PALL CORPORATION</div>\n<div style=\"font-weight: bold;text-decoration: underline;\">SLS GLOBAL TECHNICAL SUPPORT</div>\n\n<p style=\"text-align: center;margin: 80px 0 80px 0\"><sup>*</sup><sup>*</sup><sup>*</sup>IMPORTANT<sup>*</sup><sup>*</sup><sup>*</sup></p>\n\n</div>\n</body>\n</html>\n`               
 };
}

    
    componentDidUpdate() {
        const th = document.getElementsByTagName('th');
        const td = document.getElementsByTagName('td');
        console.log(th, td);
        for (const index in th) {
            if (th[index].style) {
                th[index].style.color = 'Black';
            }
        }
        for (const index in td) {
            if (td[index].style) {
                td[index].style.color = 'Black';
            }
        }
        return true;
    }

    downloadPdf() {
        const content = 'JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDgyMD4+c3RyZWFtCnicrVXbctowEH33V+xj2imKZFmSnTdCIaFDgYJLnk0QwR2MiS3I5K/SP+zKXIovyfShkyFjaffsOdpdrZ6d29DhEpSQEC4cCi3BBKGBXXRD54c1M6D4x4BxTtBNMY8oAWHiXPdw0y8WS+eqozMTL+PHyGhIl9DfGP2UxeYVQp0bGEdZlGijs/xT+MuGvgiM/FIpotxzULeI2M/znV7AMs1umkGSEp8fQO4JNIvWemPiTQqTNM/jZqDHSSAqbF9Pwi3rDTDWorzlUqaOIag96IvjMkkCBZIyIhQkDg8wX/y0XjtTJHq55DsDOKGqwjnONLJlGu7T9eKdRD1jFZ4dF75hde7e/x3U0YJ0cudwQSQH4SviSavysEQpghUi3/E/OCSOUJJw/yNA2eMv4sD4EaKi6QKA5yh1nGJEBiCkJF6Ruff2KYSPl2ntxWtMoE2lgeEumevM5vLcx0cdZXiLUc9GpcfWv6ygz4nvNeioGapCHrTBVnyC3noXLy41cBHY1q1qULKJ35OcYMA6f81Q5S/11yW/8Dzi1XPgM8IbJfiUcDwoR3tJQXX/KOB8G9uzHnXZjFJ3PCvVQOJ951VgC3sBK9NUAsELvTUBNUNVgaLXnEI3vG8PR4Prh3bYnZQKEVDCgpoQxiVRjbUIXMJ4g5CaoSoEM+WWSoCDtq685XLCRRMzFsbzA5u18sALVxri87A1dobso/VO57gLBo0mmq81RPN0j/+32zU6pRAdPI1OtjqLjO0RnH0uhd8g3jrwEpsVPKbJ1jaQLrcu6lCC8ELHVRRnEOUFz/bUbHm6yx41ga+7zDZ/ocGSIVOcLo7rEq/dWh4ubYR8yRxF5qt0h0Nxk5oqO4794MC+j7JXSFIMYlbRBrWztw4pz2sLYC4RAieOizdfBad1w6wunD1CRSXHnUzj67D4AtP4aYNPUrRZwDTa49f8FW6gH87s6wfTwbTxveEKR4uszv72YACd0WQ8mrTD/mjYjBR4T/wKEmngbjC6bQ8g7Hbuh/0Ofk1/jjFSWI/i4qhxA+D4/ninYwXHR1vY6xbmztVni6P289+2LnLT/25528OC+r8ER/1/AATB/l4KZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L0NvbnRlbnRzIDMgMCBSL1R5cGUvUGFnZS9SZXNvdXJjZXM8PC9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXS9Gb250PDwvRjEgMSAwIFIvRjIgMiAwIFI+Pj4+L1BhcmVudCA0IDAgUi9NZWRpYUJveFswIDAgNjEyIDc5Ml0+PgplbmRvYmoKMSAwIG9iago8PC9TdWJ0eXBlL1R5cGUxL1R5cGUvRm9udC9CYXNlRm9udC9IZWx2ZXRpY2EtQm9sZC9FbmNvZGluZy9XaW5BbnNpRW5jb2Rpbmc+PgplbmRvYmoKMiAwIG9iago8PC9TdWJ0eXBlL1R5cGUxL1R5cGUvRm9udC9CYXNlRm9udC9IZWx2ZXRpY2EvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nPj4KZW5kb2JqCjQgMCBvYmoKPDwvS2lkc1s1IDAgUl0vVHlwZS9QYWdlcy9Db3VudCAxPj4KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSPj4KZW5kb2JqCjcgMCBvYmoKPDwvTW9kRGF0ZShEOjIwMTcxMTAzMjIwMjUwKzA1JzMwJykvQ3JlYXRvcihQYWxsIENvcnBvcmF0aW9uKS9DcmVhdGlvbkRhdGUoRDoyMDE3MTEwMzIyMDI1MCswNSczMCcpL1Byb2R1Y2VyKGlUZXh0riA1LjQuMiCpMjAwMC0yMDEyIDFUM1hUIEJWQkEgXChBR1BMLXZlcnNpb25cKSkvU3ViamVjdChJbnRlZ3JpdHkgVGVzdCBMaW1pdHMgLSBDZXJ0aWZpY2F0ZSkvQXV0aG9yKFBhbGwgQ29ycG9ydGF0aW9uKS9UaXRsZShDZXJ0aWZpY2F0ZSk+PgplbmRvYmoKeHJlZgowIDgKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAxMDY4IDAwMDAwIG4gCjAwMDAwMDExNjEgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAxMjQ5IDAwMDAwIG4gCjAwMDAwMDA5MDIgMDAwMDAgbiAKMDAwMDAwMTMwMCAwMDAwMCBuIAowMDAwMDAxMzQ1IDAwMDAwIG4gCnRyYWlsZXIKPDwvSW5mbyA3IDAgUi9JRCBbPDc3MDE2M2ZhZTk4Njg0MmU4MTlhNTQyNmM1MTgwYzdhPjwyMTc5ZjIwYWUxYzIwNTA3N2M3ZTAxMDIyMmU5YjY3ZT5dL1Jvb3QgNiAwIFIvU2l6ZSA4Pj4KJWlUZXh0LTUuNC4yCnN0YXJ0eHJlZgoxNjE0CiUlRU9GCg==';
        const downloadLink = document.createElement('a');
        downloadLink.target = '_blank';
        downloadLink.download = 'name_to_give_saved_file.pdf';
        // base64 string
        const base64str = content;

        // decode base64 string, remove space for IE compatibility
        const binary = atob(base64str.replace(/\s/g, ''));
        const len = binary.length;
        const buffer = new ArrayBuffer(len);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }

        // create the blob object with content-type "application/pdf"               
        const blob = new Blob([view], { type: 'application/pdf' });
        // create an object URL from the Blob
        const URL = window.URL || window.webkitURL;
        const downloadUrl = URL.createObjectURL(blob);

        // set object URL as the anchor's href
        downloadLink.href = downloadUrl;

        // append the anchor to document body
        document.body.append(downloadLink);

        // fire a click event on the anchor
        downloadLink.click();

        // cleanup: remove element and revoke object URL
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
    }

   
    render() {
        return (
            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
                {/*{ReactHtmlParser(this.state.html)} */}
                {/* <div style={{"textAlign":"left","marginTop":"40px"}}><img src="images/login/logo.png" alt="pall logo" /></div>
                <p style={{"fontSize": "25px","textAlign": "center","fontWeight": "bold"}}>Certificate of Integrity Test Parameters</p>

                <div>
                    <div style={{"fontWeight": "bold"}}>Issued for:</div>
                    <div>{this.state.name}</div>
                </div>

                <p style={{"fontWeight": "bold"}}>Date of Issue: 22/05/2017</p>

                <div style={{"textAlign": "center","marginTop": "80px","fontWeight": "bold","textDecoration": "underline"}}><p>Forward Flow Test Parameters</p></div>

                <table cellPadding="10" style={{"border": "1px solid black","borderCollapse": "collapse","width":"100%","textAlign": "center"}}>
                    <tbody ><tr style={{ "border": "1px solid black"}}>
                        <th style={{ "border": "1px solid black","color":"black","textAlign":"center"}}>Filter Part Number</th>
                        <th style={{ "border": "1px solid black","color":"black","textAlign":"center"}} >Wetting Fluid</th>
                        <th style={{ "border": "1px solid black","color":"black","textAlign":"center"}} >Forward Flow Limit</th>
                    </tr>
                        <tr style={{ "border": "1px solid black","color":"black"}}>
                            <td style={{ "border": "1px solid black","color":"black"}}>{this.state.filterpart}</td>
                            <td style={{ "border": "1px solid black","color":"black"}}>WATER</td>
                            <td style={{ "border": "1px solid black","color":"black"}}>2.9</td>
                        </tr>

                    </tbody></table>

                <p>The integrity test values in the table above apply to a test temperature of 20 ± 5°C with compressed [Pressure Source] as the pressure source. During the test period the temperature of the filter assembly should not vary more than ± 1°C.</p>


                <div style={{"textDecoration": "underline"}}>[NOTE : For PH]</div>
                <div style={{"textDecoration": "underline"}}>[NOTE : For Gross Failure Value]</div>

                <p style={{"margin": "40px 0 30px 0","textDecoration": "underline"}}>Created, Signed and Saved by :  ITVCert SLS </p>


                <div style={{"marginTop": "20px","fontWeight": "bold","textDecoration": "underline"}}>PALL CORPORATION</div>
                <div style={{"fontWeight": "bold","textDecoration": "underline"}}>SLS GLOBAL TECHNICAL SUPPORT</div>

                <p style={{"textAlign": "center","margin": "80px 0 80px 0"}}><sup>*</sup><sup>*</sup><sup>*</sup>IMPORTANT<sup>*</sup><sup>*</sup><sup>*</sup></p> */}
                <div style={{ float: 'right' }}>Download pdf from <a onClick={() => { this.downloadPdf(); }}>here <img src="images/download.png" /></a></div>

            </div>
        );
    }
}


export default ChartsAction;
