import Ember from 'ember';

export default Ember.Controller.extend({
    mockdata:Ember.inject.service('mock-data'),
    actions:{
        schemaChanged(data){
           this.get('mockdata').set('layoutModel',data);
        },
        layoutCallBack(message){
            console.log(message);

        }
    }
});
