'use strict';

var module = angular.module('supportAdminApp');

module.constant('terms.Constants', {
    AGREEABILITY_TYPES : [
        {
            id: "2285af84-61f4-11ea-9a2c-3c15c2e2c206",
            name: "Non-agreeable"
        },
        {
            id: "282f857c-61f4-11ea-a4ef-3c15c2e2c206",
            name: "Non-electronically-agreeable"
        },
        {
            id: "2c78f834-61f4-11ea-bd4f-3c15c2e2c206",
            name: "Electronically-agreeable"
        },
        {
            id: "301a36ec-61f4-11ea-bc96-3c15c2e2c206",
            name: "Docusign-template"
        }
    ]
});
