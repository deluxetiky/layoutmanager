import Ember from 'ember';
import jsbeautifier from 'npm:js-beautify';
export default Ember.Component.extend({
  classNameBindings: ['propertyA'],
  propertyA: 'layout-wrapper',
  layoutPlacement: 'absolute',
  lastSelectedElement: {},
  current: {
    customCssProperties: [],
    isAdvanced: false,
    isRow: true,
    customClass: ''
  },
  selectedModules: [],
  schema: Ember.computed('htmlContent', 'editHtmlContent', 'selectedModules', function () {
    return {
      htmlContent: this.get('htmlContent'),
      editHtmlContent: this.get('editHtmlContent'),
      selectedModules: this.get('selectedModules'),
      lastEditedTime: new Date(),
    }
  }),
  availableSizes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  clearEnabled: Ember.computed('current.customCssProperties.[]', 'current.isAdvanced', function () {
    return this.get('current.customCssProperties.length') > 0 && this.get('current.isAdvanced');
  }),
  sizeSelectionEnabled: Ember.computed.equal('current.isRow', false),
  availableModules: Ember.computed('selectedModules.[]', 'modules.[]', function () {
    let modules = this.get('modules');
    return modules.filter((val, index) => {
      let selModules = this.get('selectedModules');
      let isAny = selModules.isAny('id', val.id);
      return !isAny;
    })
  }),
  init() {
    this._super(...arguments);
    let givenModules = this.get('schemaDefault.selectedModules').map((value) => {
      return value;
    }); //to clone object.
    this.set('selectedModules', givenModules);
    this.set('selectedModule',this.get('availableModules')[0]);
  },
  didInsertElement() {
    this._super(...arguments);
    var mainview = $(".layout-wrapper .main-view").first();
    mainview.addClass('selectedUi');
    this.set('lastSelectedElement', mainview);
    mainview.click((e) => this.uiSelectionClick(e));
    hljs.initHighlightingOnLoad();
    hljs.configure({
      useBR: true
    });
    let htmlArea = $('.code');
    htmlArea.each((i, block) => {
      hljs.highlightBlock(block);
    });
    mainview.html(this.get('schemaDefault.editHtmlContent'));   
    this.bindDomActions();
    this.updateHtmlContent();
  },

  uiSelectionClick(e) {
    let target = $(e.target);
    this.toggleAppereance(target);
  },
  toggleAppereance(target) {
    $('.layout-wrapper .added-component').removeClass('selectedUi'); //clear other selectedUi class
    if (target.hasClass('added-component')) {
      $(target).toggleClass('selectedUi');
      this.set('lastSelectedElement', target);
    } else {
      let upParent = target.parents().eq(0);
      if (upParent.hasClass('added-component')) {
        upParent.toggleClass('selectedUi');
        this.set('lastSelectedElement', upParent);
      }
    }

  },
  appendToLayout(toBeAdded, view) {
    let placement = this.get('layoutPlacement');
    this.current.customCssProperties.forEach((element) => {
      toBeAdded.css(element.key, element.value);
    });

    toBeAdded.addClass(this.get('current.customClass'));
    if ((placement === 'before' || placement === 'after') && !view.hasClass('main-view')) {

      if (placement === 'after') {
        view.after(toBeAdded);
      } else if (placement === 'before') {
        view.before(toBeAdded);
      }
    } else { //position absolute
      let len = view.children('div .added-module').length;
      if (len > 0) {
        this.notification('Modul seviyesinde katman eklenemez.');
      
    } else {
        if (view.hasClass('main-view')) {
          view.append(toBeAdded);
        } else {
          view.append(toBeAdded);
        }
      }
    }

  },
  removeLayout(e) {
    let parants = $(e.target).parents();
    parants.eq(2).toggleClass('selectedUi');
    let toBeRemoved = parants.eq(1);
    if (!toBeRemoved.hasClass('main-view')) {
      let module = toBeRemoved.find('.added-module');
      toBeRemoved.remove();
      if (module.length) {
        module.each((index, val) => {
          let moduleId = $(val).attr('dommoduleid');
          this.get('selectedModules').removeObject(this.get('selectedModules').findBy('id', moduleId));
        })
      }
    }
    this.updateHtmlContent();

  },
  updateHtmlContent() {
    var dupLication = $('.main-view').clone();

    var closeComps = dupLication.find('.added-component > .close-component');
    closeComps.each((index, val) => {
      $(val).remove();
    });
    dupLication.find('div.row').each((index, val) => {
      $(val).removeClass('row').addClass('rowfluid');
    });
    var allDivs = dupLication.find('div');
    allDivs.each((index, val) => {
      $(val).removeClass('panel panel-default asrow selectedUi added-component added-module component-hover');
      $(val).attr('class', $(val).attr('class').replace(/\bcol-sm--*?\b/g, 'span')); //span in my theme     


    });
    let beautifyContent = jsbeautifier.html(dupLication.html(), {
      "indent_size": 4,
      "html": {
        "end_with_newline": true,
        "js": {
          "indent_size": 2
        },
        "css": {
          "indent_size": 2
        }
      }
    });
    this.set('htmlContent', beautifyContent);
    this.set('editHtmlContent', $('.main-view').html());
    this.get('schemaChanged')(this.get('schema'));

  },
  bindDomActions() {
    let hoverIn = function () {
      $(this).addClass('component-hover');
      $(this).find('.close-component').first().removeClass('hidden');
    };
    let hoverOut = function () {
      $(this).removeClass('component-hover');
      $(this).find('.close-component').first().addClass('hidden');
    };
    let hovers = $('.main-view .added-component ,.main-view .container-fluid,.main-view .asrow');    
    hovers.hover(hoverIn, hoverOut);
    $('.added-component .close-component').click((e) => this.removeLayout(e));   
  },
  actions: {
    addToView() {
      let sel = $(this.get('lastSelectedElement'));
      let cur = this.get('current');
      let toBeAdded = $('<div class="col-sm-' + cur.size + ' panel panel-default added-component"></div>');
      let closeBar = $('<div><i class="fa fa-times"></i></div>').addClass('close-component hidden');

      //  toBeAdded.hover(hoverIn, hoverOut);
      //  closeBar.click((e) => this.removeLayout(e));
      toBeAdded.append(closeBar);
      if (cur.isRow) {
        var row = $('<div></div>').addClass('row panel panel-default added-component asrow');
        row.append(closeBar);
        //  row.hover(hoverIn, hoverOut);
        if (cur.isFluid) {
          row.addClass('rowfluid');
          let containerFluid = $('<div></div>').addClass('container-fluid panel panel-default added-component asrow');
          containerFluid.append(closeBar);
          //   containerFluid.hover(hoverIn, hoverOut);
          this.appendToLayout(containerFluid, sel);
        } else {
          this.appendToLayout(row, sel);
        }
      } else {
        this.appendToLayout(toBeAdded, sel);
      }
      this.bindDomActions();
      this.updateHtmlContent();
    },
    addModuleToLayout() {
      let sel = $(this.get('lastSelectedElement'));
      let countLayout = sel.find('.added-component').length;
      let countModule = sel.find('.added-module').length;    
      if (countLayout > 0) {
        this.notification('Ara katman üzerine ekleme yapılamaz.');
      } else if (countModule > 0) {
        this.notification('Bir katmana en fazla bir modul eklenebilir.');
      } else if (sel.hasClass('main-view')) {
        this.notification('Lütfen en az bir katman ekleyin');
      } else {
        if (!Ember.isEmpty(this.get('selectedModule'))) {
          let module = $('<div><div>')
            .attr('domModuleId', this.get('selectedModule.id'))
            .addClass('added-module')
            .html(this.get('selectedModule.moduleName'));
          module.click((e) => this.uiSelectionClick(e));
          sel.append(module);
          this.get('selectedModules').pushObject(this.get('selectedModule'));
          this.set('selectedModule', this.get('availableModules')[0]);
        }

      }
      this.updateHtmlContent();
    },
    addNewCssProp() {
      this.current.customCssProperties.pushObject({});
    },
    clearCssProp() {
      this.set('current.customCssProperties', []);
      this.set('current.customClass', '');
    }
  }
});
