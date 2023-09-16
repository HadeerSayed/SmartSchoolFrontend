The modules directory contains a collection of modules which are each independent of each other. This allows Angular to load only the module it requires to display the request thereby saving bandwidth and speeding the entire application.

In order to accomplish this each module must have its own routing which is a loadChildren route resource defined in the AppRoutingModule. This is also covered in the layout documentation

For each new module run ng generate module modules/NewModule

