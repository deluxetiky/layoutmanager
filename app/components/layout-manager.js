import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['propertyA'],
  propertyA: 'layout-wrapper',
  lastSelectedElement: {},
  current: {},
  selectedModules:[],
  availableModules:Ember.computed('selectedModules.[]','modules.[]',function(){
    let modules = this.get('modules');
    return modules.filter((val,index)=>{
      let selModules = this.get('selectedModules');
      let isAny = selModules.isAny('id',val.id);
      return !isAny;
    })
  }),
  didInsertElement() {
    this._super(...arguments);
    var mainview = $(".layout-wrapper .main-view").first();
    mainview.addClass('selectedUi');
    this.set('lastSelectedElement', mainview);
    mainview.click((e)=>this.uiSelectionClick(e));
  },
  uiSelectionClick(e){
      let target = $(e.target);     
      this.toggleAppereance(target);
  },
  toggleAppereance(target) {
     $('.layout-wrapper .added-component').removeClass('selectedUi'); //clear other selectedUi class
    if (target.hasClass('added-component')) {
      $(target).toggleClass('selectedUi');
    }
    let upParent = target.parents().eq(0);
    if(upParent.hasClass('added-component')){
      upParent.toggleClass('selectedUi');
    }
    this.set('lastSelectedElement', target);
  },
  appendToLayout(toBeAdded,view){
    console.log(view);
    let len = view.children('div .added-module').length;    
    if(len>0){
      console.log('Modul seviyesinde katman eklenemez.');
    }else{
      view.append(toBeAdded);
    }
  },

  actions: {
    addToView() {
      let sel = $(this.get('lastSelectedElement'));
      let cur = this.get('current');
      let toBeAdded = $('<div class="col-sm-' + cur.size + ' panel panel-default added-component"></div>');
      let closeBar = $('<div><i class="fa fa-times"></i></div>').addClass('close-component hidden');
      let hoverIn = function () {
        $(this).addClass('component-hover');
        $(this).find('.close-component').first().removeClass('hidden');
      };
      let hoverOut = function () {
        $(this).removeClass('component-hover');
        $(this).find('.close-component').first().addClass('hidden');
      };
      toBeAdded.hover(hoverIn, hoverOut);
      closeBar.click((e) => {
        //   console.log('Kapat');
        let parants = $(e.target).parents();
        parants.eq(2).toggleClass('selectedUi');
        let toBeRemoved =  parants.eq(1);
        if(!toBeRemoved.hasClass('main-view')){
          toBeRemoved.remove();
        }
       
      });
      toBeAdded.append(closeBar);
      if (cur.isRow) {
        var row = $('<div></div>').addClass('row panel panel-default added-component asrow');
        row.append(closeBar);
        row.hover(hoverIn, hoverOut);
        if (cur.isFluid) {
          row.addClass('rowfluid');
        }
        this.appendToLayout(row,sel);

      } else {
        this.appendToLayout(toBeAdded,sel);
      }
    },
      addModuleToLayout(){
      let sel = $(this.get('lastSelectedElement'));
      let countLayout = sel.find('.added-component').length;
      let countModule = sel.find('.added-module').length;
      console.log(countLayout);
      if(countLayout>0){
        console.log('Ara katman üzerine ekleme yapılamaz.');
      }else if(countModule>0){
        console.log('Bir katmana en fazla bir modul eklenebilir.');
      }else if(sel.hasClass('main-view')){
        console.log('Lütfen en az bir katman ekleyin');
      }    
      else{
        let module = $('<div><div>').attr('moduleId',this.get('selectedModule.id')).addClass('added-module').html(this.get('selectedModule.moduleName'));
        module.click((e)=>this.uiSelectionClick(e));
        sel.append(module);
        this.get('selectedModules').pushObject(this.get('selectedModule'));
        this.set('selectedModule',this.get('availableModules')[0]);
      }
    },
  }
});
