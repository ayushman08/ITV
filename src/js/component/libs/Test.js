import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Base64 from 'base-64';


class Test extends Component {
    constructor(props) {
        super(props);
    }

    generatePdf() {
        const doc = new jsPDF('p', 'pt', 'letter');
        const specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };
        const encoded = 'PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KCTx0aXRsZT5DZXJ0aWZpY2F0ZTwvdGl0bGU+CjwvaGVhZD4KPGJvZHk+CjxkaXYgPgo8ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0O21hcmdpbi10b3A6IDQwcHgiPjxpbWcgc3JjPS9sb2dvLnBuZyBhbHQ9InBhbGwgbG9nbyIgLz48L2Rpdj4KPHAgc3R5bGU9ImZvbnQtc2l6ZTogMjVweDt0ZXh0LWFsaWduOiBjZW50ZXI7Zm9udC13ZWlnaHQ6IGJvbGQ7Ij5DZXJ0aWZpY2F0ZSBvZiBJbnRlZ3JpdHkgVGVzdCBQYXJhbWV0ZXJzPC9wPgoKPGRpdj4KPGRpdiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7Ij5Jc3N1ZWQgZm9yOjwvZGl2Pgo8ZGl2PlZhbGVudGlubyBSb3NzaTwvZGl2Pgo8L2Rpdj4KCjxwIHN0eWxlPSJmb250LXdlaWdodDogYm9sZDsiPkRhdGUgb2YgSXNzdWU6IDExLTA0LTIwMTc8L3A+Cgo8ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7bWFyZ2luLXRvcDogODBweDtmb250LXdlaWdodDogYm9sZDt0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsiPjxwPlByZXNzdXJlIEhvbGQgVGVzdCBQYXJhbWV0ZXJzPC9wPjwvZGl2PgoKPHRhYmxlIGNlbGxwYWRkaW5nPSIxNSIgc3R5bGU9IiBib3JkZXI6IDFweCBzb2xpZCBibGFjaztib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjogY2VudGVyOyI+CiAgPHRyIHN0eWxlPSIgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7Ij4KICAgIDx0aCBzdHlsZT0iYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7dGV4dC1hbGlnbjogY2VudGVyOyI+RmlsdGVyIFBhcnQgTnVtYmVyPC90aD4KICAgIDx0aCBzdHlsZT0iYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7dGV4dC1hbGlnbjogY2VudGVyOyI+V2V0dGluZyBGbHVpZDwvdGg+CiAgICA8dGggc3R5bGU9ImJvcmRlci1yaWdodDogMXB4IHNvbGlkIGJsYWNrO3RleHQtYWxpZ246IGNlbnRlcjsiPiBQcmVzc3VyZSBIb2xkIDwvdGg+CiAgPC90cj4KICA8dHIgc3R5bGU9IiBib3JkZXI6IDFweCBzb2xpZCBibGFjazsiPgogICAgPHRkIHN0eWxlPSJib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBibGFjazsiPkFWRjAyMVYwMDJQVjwvdGQ+CiAgICA8dGQgc3R5bGU9ImJvcmRlci1yaWdodDogMXB4IHNvbGlkIGJsYWNrOyI+NzAvMzAgRVRIQU5PTC9XQVRFUjwvdGQ+CiAgICA8dGQgc3R5bGU9ImJvcmRlci1yaWdodDogMXB4IHNvbGlkIGJsYWNrO3RleHQtYWxpZ246IGNlbnRlcjsiPjAuMzI8L3RkPgogIDwvdHI+CiAKPC90YWJsZT4KCjxwPlRoZSBpbnRlZ3JpdHkgdGVzdCB2YWx1ZXMgaW4gdGhlIHRhYmxlIGFib3ZlIGFwcGx5IHRvIGEgdGVzdCB0ZW1wZXJhdHVyZSBvZiAyMCDCsSA1wrBDIHdpdGggY29tcHJlc3NlZCBhaXIgYXMgdGhlIHByZXNzdXJlIHNvdXJjZS4gRHVyaW5nIHRoZSB0ZXN0IHBlcmlvZCB0aGUgdGVtcGVyYXR1cmUgb2YgdGhlIGZpbHRlciBhc3NlbWJseSBzaG91bGQgbm90IHZhcnkgbW9yZSB0aGFuIMKxIDHCsEMuPC9wPgoKCjxkaXYgc3R5bGU9InRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyI+PC9kaXY+CjxkaXYgc3R5bGU9InRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyI+PC9kaXY+Cgo8cCBzdHlsZT0ibWFyZ2luOiA0MHB4IDAgMzBweCAwO3RleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyI+Q3JlYXRlZCwgU2lnbmVkIGFuZCBTYXZlZCBieSA6ICBJVFZDZXJ0IFNMUyA8L3A+CgoKPGRpdiBzdHlsZT0ibWFyZ2luLXRvcDogMjBweDtmb250LXdlaWdodDogYm9sZDt0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsiPlBBTEwgQ09SUE9SQVRJT048L2Rpdj4KPGRpdiBzdHlsZT0iZm9udC13ZWlnaHQ6IGJvbGQ7dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7Ij5TTFMgR0xPQkFMIFRFQ0hOSUNBTCBTVVBQT1JUPC9kaXY+Cgo8cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyO21hcmdpbjogODBweCAwIDgwcHggMCI+PHN1cD4qPC9zdXA+PHN1cD4qPC9zdXA+PHN1cD4qPC9zdXA+SU1QT1JUQU5UPHN1cD4qPC9zdXA+PHN1cD4qPC9zdXA+PHN1cD4qPC9zdXA+PC9wPgoKPC9kaXY+CjwvYm9keT4KPC9odG1sPgo=';

        const html = Base64.decode(encoded);
        console.log(html);
        doc.fromHTML(html, 15, 15, {
            width: 600,
            elementHandlers: specialElementHandlers
        });
        doc.save('sample-file.pdf');
    }

    render() {
        return (
            <div className="main">
                <button onClick={this.generatePdf}>Hit</button>
            </div>
        );
    }
}


export default Test;
