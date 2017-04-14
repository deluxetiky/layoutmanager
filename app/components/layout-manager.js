import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: ['propertyA'],
    propertyA: 'layout-wrapper',
    didInsertElement(){
        this._super(...arguments);
        var mainview = $(".layout-wrapper .main-view").first();
        console.log(mainview);
        mainview.click((e)=> {
       console.log('Tıklandı');
       console.log(e.target);
    });
    }
});
