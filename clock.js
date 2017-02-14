// CopyRight Guido Leen //
/*   7 FEBRUARY 2017    */

// Init
var diaH = 100;
var secRad = 100;
var minRad = 90;

// Go and create the circle
function cl_position(_angle, _radi, _obj)
{
    // Sin = y // cos = x
    var obj = document.getElementById(_obj);

    var yPos = Math.sin(_angle * Math.PI / 180.0); // Math.cos(_angle);
    var xPos = Math.cos(_angle * Math.PI / 180.0);

    //if(xPos< 0) xPos = (xPos*-1);
    obj.style.left = (xPos * _radi) + "px";
    obj.style.top = (yPos * _radi) + "px";
}
// Create the span
function html_clock(_id, _nr, _css)
{
    return "<span id='" + _id + "' class='clock-nr " + _css + "'>" + _nr + "</span>";
}
// create the clock
var Clock = document.getElementById('clock');
function create_clock()
{
    var strTotal = "";
    for (i = 0; i < 12; i++) {
        strTotal += html_clock(i, i + 1, '');
    }

    Clock.innerHTML = strTotal;
}
create_clock();

// Set position clock
iC = -60; // Start from calling the cos sin function
function create_clock_total()
{
    for (i = 0; i < 12; i++) {
        cl_position(iC, diaH, i);
        iC = (iC + 30);
    }
}
create_clock_total();

// Set the time
Clock.innerHTML += html_clock('sec', '', 'clock-sec'); // Next span for seconds
Clock.innerHTML += html_clock('min', '', 'clock-min'); // Next span for minutes
var timeangle = -90; // Start from calling the cos sin function
function the_time()
{
    var dNow = new Date();
    var seco = dNow.getSeconds();
    var minu = dNow.getMinutes();
    var hrs = dNow.getHours() - 12;

    var obj = document.getElementById('clock');
    var objCh;
    var Nodeid;

    // Highlight the hour
    for (i = 0, n = 12 ; i < n; i++) // obj.children.length
    {
        // Extract the no from the id and give class highlight
        objCh = obj.childNodes[i];
        Nodeid = (objCh.attributes.getNamedItem('id').nodeValue);

        if (Nodeid == hrs-1)
        {
            objCh.setAttribute('class', 'clock-nr clock-hlght');
        }
        else {
            objCh.setAttribute('class', 'clock-nr');
        }
    }

    // Show seconds in a circle
    sec_angle = (timeangle + (6 * seco));
    cl_position(sec_angle, secRad, 'sec');

    // Show minutes in a circle
    sec_min = (timeangle + (6 * minu));
    cl_position(sec_min, minRad, 'min');

    window.setTimeout(the_time, 1000);
}

// call the time function
the_time();