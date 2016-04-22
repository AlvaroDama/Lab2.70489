'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);

    });
}

var context = SVGPoint.ClientContext.get_current();
var hostweb;
var user = context.get_web().get_currentUser();
var taxonomySession;
var termStore;
var groups;
var corporateGroup;
var corporateTermSet;
var corporateGroupGUID = createGuid();
var corporateTermSetGUID = createGuid();
var hrTermGUID = createGuid();
var salesTermGUID = createGuid();
var technicalTermGUID = createGuid();
var engineeringTermGUID = createGuid();
var softwareTermGUID = createGuid();
var supportTermGUID = createGuid();

var metaDataField;
var xmlNoteField = '<Field ' +
    'ID="{B758A862-9114-4B89-B73D-DFA806CB5101}" ' +
    'Name="CorporateUnitTaxHTField0" ' +
    'StaticName="CorporateUnitTaxHTField0" ' +
    'DisplayName="Corporate Unit_0" ' +
    'Type="Note" ' +
    'ShowInViewForms="FALSE" ' +
    'Required="FALSE" ' +
    'Hidden="TRUE" ' +
    'CanToggleHidden="TRUE" ' +
    'RowOrdinal="0"></Field>';

var xmlMetaDataField = '<Field ' +
    'ID="{ce641499-5955-4858-a4b5-9d994fdcea03}" ' +
    'Name="CorporateUnit" ' +
    'StaticName="CorporateUnit" ' +
    'DisplayName="Corporate Unit" ' +
    'Type="TaxonomyFieldType" ' +
    'ShowField="Term1033" ' +
    'EnforceUniqueValues="FALSE" ' +
    'Group="Custom Columns"> ' +
    '   <Customization> ' +
    '       <ArrayOfProperty> ' +
    '           <Property> ' +
    '               <Name>TextField</Name> ' +
    '               <Value xmlns:q6="http://www.w3.org/2001/XMLSchema" ' +
    '                       p4:type="q6:string" ' +
    '                       xmlns:p4="http://www.w3.org/2001/XMLSchema-instance"> ' +
    '                       {B758A862-9114-4B89-B73D-DFA806CB5101} ' +
    '               </Value> ' +
    '           </Property> ' +
    '       </ArrayOfProperty> ' +
    '   </Customization> ' +
    '</Field>';

var loadTermStore = function() {
    taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
    termStore = taxonomySession.get_termStores().getByName("Taxonomy_pi9MT+1u9Xd0Arzh6e6MCQ==");

    context.load(taxonomySession);
    context.load(termStore);
    context.executeQueryAsync(function() {
        $('#status-message').text("Almacén de términos cargado.");
        checkGroups();
    }, function(sender, args) {
        $('#status-message').text("Error: el almacén de términos no pudo cargarse.");
    });
};

var checkGroups = function() {
    var groups = termStore.get_groups();
    context.load(groups);
    context.executeQueryAsync(function ()
    {
        $('#groups-list').children().remove();

        var groupEnum = groups.getEnumerator();
        while (groupEnum.moveNext())
        {
            var currentGroup = groupEnum.get_current();
            var currentGroupID = currentGroup.get_id();
            var groupDiv = document.createElement("div");
            groupDiv.appendChild(document.createTextNode(currentGroup.get_name()));
            $('#groups-listt').append(groupDiv);
        }
    }, function (sender, args)
    {
        $('#status-message').text("Error: no se pueden cargar los grupos.");
    });
};

var createTermSet = function() {
    $('#status-message').text("Creando el grupo y el almacén de términos...");

    corporateGroup = termStore.createGroup("Estructura Corporativa", corporateGroupGUID);
    context.load(corporateGroup);

    corporateTermSet = corporateGroup.createTermSet("aDamaSP", corporateTermSetGUID, 1033);
    context.load(corporateTermSet);

    context.executeQueryAsync(function() {
        $('')
    }, function() {

    });
};

