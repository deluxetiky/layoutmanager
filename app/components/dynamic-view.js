import Ember from 'ember';

let layout = Ember.HTMLBars.compile(' hello');
export default Ember.Component.extend({

  attributeBindings: ['moduleName'],
  moduleName: 'dynamicView'

});
