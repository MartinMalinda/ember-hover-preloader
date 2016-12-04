import Ember from 'ember';

const {computed, typeOf} = Ember;

export default Ember.LinkComponent.extend({

  
  _targetRouteModel: computed('targetRouteName', function(){
    const models = this.get('models');

    if(typeOf(models[0]) === 'object'){
      return models[0];
    }

    const app = Ember.getOwner(this);
    const targetRoute = app.__container__.lookup(`route:${this.get('targetRouteName')}`);

    const params = {};
    models.forEach((model, index) => {
      params[targetRoute._names[index]] = model;
    });

    return targetRoute.model(params);
  }),

  mouseEnter(){
    const targetModel = this.get('_targetRouteModel');

    if(targetModel.then){
      this.set('_isPreloadingModel', true);
      targetModel.then(model => {
        this.set('_isPreloadingModel', false);
        this.set('_models', [model]);
      });
    }
  },

  _invoke(event){
    if(this.get('_models')){
      this.set('models', this.get('_models'));
      this.set('_models', null);
    }

    return this._super(...arguments);
  },

  didReceiveAttrs(){
    this.notifyPropertyChange('_targetRouteModel');
  }
});
