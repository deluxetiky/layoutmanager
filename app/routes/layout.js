import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return {
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
