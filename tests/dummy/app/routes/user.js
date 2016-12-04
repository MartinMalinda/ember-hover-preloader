import Ember from 'ember';

export default Ember.Route.extend({
  model({login}){
    return this.store.findRecord('githubUser', login);
  }
});
