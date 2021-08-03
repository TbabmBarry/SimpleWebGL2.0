function shaderObject(typeIn,textIn)// Declare shaderObject class
{
	this.type=typeIn;
	this.text=textIn;
}
var shaderStrArray=["a","a"];
var shaderNumberCount=0;     
var shaderTypeName=["vertex","fragment"];
function processLoadShader(req,index)
{
	if (req.readyState == 4) 
	{
		var shaderStr = req.responseText;
        shaderStrArray[shaderNumberCount]=new shaderObject(shaderTypeName[shaderNumberCount],shaderStr);
        shaderNumberCount++;
		if(shaderNumberCount>1)
		{
            shaderProgArray[index]=loadShaderSerial(gl,shaderStrArray[0], shaderStrArray[1]);
		}
	}
}

function loadShaderFile(url,index)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function () 
	{ processLoadShader(req,index) };
	req.open("GET", url, true);
	req.responseType = "text";
	req.send(null);
}



