import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['propertyA'],
  propertyA: 'layout-wrapper',
  lastSelectedElement: {},
  current: {},
  didInsertElement() {
    this._super(...arguments);
    var mainview = $(".layout-wrapper .main-view").first();
    mainview.addClass('selectedUi');
    this.set('lastSelectedElement', mainview);
        mainview.click((e) => {
      let target = $(e.target);
      $('.layout-wrapper .added-component').removeClass('selectedUi'); //clear other selectedUi class
      this.toggleAppereance(target);
      //   console.log(target.find('.added-component').length);
      this.set('lastSelectedElement', target);
    });

  },
  toggleAppereance(target) {
    if (target.hasClass('added-component')) {
      $(target).toggleClass('selectedUi');
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
        parants.eq(1).remove();
      });
      toBeAdded.append(closeBar);
      if (cur.isRow) {
        var row = $('<div></div>').addClass('row panel panel-default added-component');
        row.append(closeBar);
        row.hover(hoverIn, hoverOut);
        if (cur.isFluid) {
          row.addClass('rowfluid');
        }
        sel.append(row);

      } else {
        sel.append(toBeAdded);
      }

    }
  }
});
