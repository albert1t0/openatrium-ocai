var selectedSharingTheme = document.getElementsByName('socialloginandsocialshare_selected_share_interface');
var selectedCounterTheme = document.getElementsByName('socialloginandsocialshare_selected_counter_interface');
var selectedProviderList= document.getElementsByName('socialloginandsocialshare_rearrange_providers_list[]');
window.onload = function(){
	
     loginRadiusToggleShareTheme(selectedSharingTheme[0].value);
	 $("#socialloginandsocialshare_veritical").click(function(){
       loginRadiusToggleShareTheme("vertical");
	 });
	 $("#socialloginandsocialshare_horizontal").click(function(){															
       loginRadiusToggleShareTheme("horizontal");
	 });
	  $("#socialloginandsocialshare_rearrange_providers").sortable({
    revert: true
  });
  }
function loginRadiusToggleShareTheme(theme){
  selectedSharingTheme[0].value=theme;
  if(theme == "vertical"){
	marginleft ='78px';
	 $(".form-radios.socialloginandsocialshare_share_vertical_images").removeClass("element-invisible");
	  $(".form-radios.socialloginandsocialshare_share_horizontal_images").addClass("element-invisible");
    $(".form-item.form-type-radios.form-item-socialshare-vertical-position").removeClass("element-invisible");
    }else{
	marginleft ='20px';
	 $(".form-radios.socialloginandsocialshare_share_horizontal_images").removeClass("element-invisible");
	 $(".form-radios.socialloginandsocialshare_share_vertical_images").addClass("element-invisible");
    $(".form-item.form-type-radios.form-item-socialshare-vertical-position").addClass("element-invisible");
}
document.getElementById('lrsharing_divwhite').style.marginLeft  = marginleft;
document.getElementById('lrsharing_divgrey').style.marginLeft  = marginleft;
}
function loginRadiusRearrangeProviderList(elem){
var ul = document.getElementById('socialloginandsocialshare_rearrange_providers');
var input = document.getElementById('socialloginandsocialshare_chnage_name');
if(elem.checked){
  var listItem = document.createElement('li');
  listItem.setAttribute('id', 'edit-lrshare-iconsprite32'+elem.value);
  listItem.setAttribute('title', elem.value);
  listItem.setAttribute('class', 'lrshare_iconsprite32 lrshare_'+elem.value);
  var provider = document.createElement('input');
  provider.setAttribute('type', 'hidden');
  provider.setAttribute('id', 'input-lrshare-'+elem.value);
  provider.setAttribute('name', 'socialloginandsocialshare_rearrange_providers_list[]');
  provider.setAttribute('value',elem.value);
  listItem.appendChild(provider);
  ul.appendChild(listItem);
  }else{
   ul.removeChild(document.getElementById('edit-lrshare-iconsprite32'+elem.value));
  }
}
function loginRadiusSharingLimit(elem){
	var checkCount = selectedProviderList.length;
     if(elem.checked){
			// count checked providers
			checkCount++;
			if(checkCount >= 10){
				elem.checked = false;
				document.getElementById('loginRadiusSharingLimit').style.display = 'block';
				return;
			}
	}
}
