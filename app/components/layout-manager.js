import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: ['propertyA'],
    propertyA: 'layout-wrapper',
    lastSelectedElement:{},
    didInsertElement(){
        this._super(...arguments);
        var mainview = $(".layout-wrapper .main-view").first();
        console.log(mainview);
        mainview.click((e)=> {
       console.log('Tıklandı');      
       this.toggleAppereance(e.target);
    });
},
toggleAppereance(target){
console.log('AppUpdate');
 console.log(target);
 $(target).toggleClass('selectedUi');
}
});
