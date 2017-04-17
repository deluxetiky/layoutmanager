import Ember from 'ember';

export default Ember.Route.extend({
    mockdata:Ember.inject.service('mock-data'),
    model(){
        let layoutModel = this.get('mockdata.layoutModel');
        return {
            layout:layoutModel,
            modules:[
                {
                    id:'ASDF2',
                    moduleName:'Header',
                },{
                    id:'ATGA',
                    moduleName:'Slider',
                },{
                    id:'QGHQ',
                    moduleName:'Bildirim Alanı',
                },{
                    id:'OPAIDMV',
                    moduleName:'Kitap Modulu',
                },{
                    id:'IAKG',
                    moduleName:'Yorum Modulu',
                },{
                    id:'AEHEH',
                    moduleName:'Footer',
                }
            ]
        }
    }
});
