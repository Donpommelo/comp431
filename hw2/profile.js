
var curName="FigmousWerbenroy";
var curMail="fwerb@anchor.gov";
var curPhone="337-846-5363";
var curZip="77463";
var curPass="pelican";

function validateForm(form){
	
	//I want to update the alert div with a single string that gets updated with each un/successful change.
	var resultInfo="";
	
	if(document.getElementById("dname").value){
		resultInfo=resultInfo.concat("<br>Your displayed name has been changed from "+curName+" to "+document.getElementById("dname").value+"!<br>Welcome "
		+document.getElementById("dname").value+"!");
		curName=document.getElementById("dname").value;
	}
		
	if(document.getElementById("email").value){
		if(document.getElementById("email").value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)){
			resultInfo=resultInfo.concat("<br>Your email has been changed from "+curMail+" to "+document.getElementById("email").value+"!");
			curMail=document.getElementById("email").value;
		}else{
			resultInfo=resultInfo.concat("<br>Your new email, "+document.getElementById("email").value+
			" is not valid. Must follow pattern: 'numbers and/or letters' @ 'numbers and/or letters' . 'letters'");
		}
	}
	
	if(document.getElementById("pnum").value){
		if(document.getElementById("pnum").value.match(/\d{3}-\d{3}-\d{4}/g)){
			resultInfo=resultInfo.concat("<br>Your phone number has been changed from "+curPhone+" to "+document.getElementById("pnum").value+"!");
			curPhone=document.getElementById("pnum").value;
		}else{
			resultInfo=resultInfo.concat("<br>Your new phone number, "+document.getElementById("pnum").value+
			" is not valid. Must follow pattern: '3 numbers' - '3 numbers' - '4 numbers'");
		}
	}
	
	if(document.getElementById("zc").value){
		if(document.getElementById("zc").value.match(/^[0-9]{5}(?:-[0-9]{4})?$/g)){
			resultInfo=resultInfo.concat("<br>Your zip code has been changed from "+curZip+" to "+document.getElementById("zc").value+"!");
			curZip=document.getElementById("zc").value;
		}else{
			resultInfo=resultInfo.concat("<br>Your new zip code, "+document.getElementById("zc").value+" is not valid. Must follow pattern: '5  or 9 Numbers'");
		}
	}
	
	if(document.getElementById("psw1").value){
		var password1 = document.getElementById("psw1"); 
		var password2 = document.getElementById("psw2"); 
		if(password1.value == password2.value){
			resultInfo=resultInfo.concat("<br>Your password has been successfully updated.");
			curPass=document.getElementById("psw1").value;
		}else{
			resultInfo=resultInfo.concat("<br>Your passwords do not match.");
		}
	}
	
	if(resultInfo==""){
		resultInfo="No changes were made.";
	}
	
	document.getElementById("alert").innerHTML=resultInfo;
	updateProfile();
	clearFields();
}

//I decided to have the updating of the displayed current info in a separate function because it is run in two situations; submitting change and loading the page.
function updateProfile(){
	document.getElementById("curName").innerHTML=curName;
	document.getElementById("curMail").innerHTML=curMail;
	document.getElementById("curPhone").innerHTML=curPhone;
	document.getElementById("curZip").innerHTML=curZip;
	
	//Password displays the length but not actual actual password to give privacy while still helping people remember current password.
	document.getElementById("curPass").innerHTML=curPass.replace(/./g,"*");
}

function clearFields(){
	document.getElementById("dname").value="";
	document.getElementById("email").value="";
	document.getElementById("pnum").value="";
	document.getElementById("zc").value="";
	document.getElementById("psw1").value="";
	document.getElementById("psw2").value="";
}

