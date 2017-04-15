import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return {
            modules:[
                {
                    id:'ASDF2',
                    moduleName:'Rapor',
                }
            ]
        }
    }
});
