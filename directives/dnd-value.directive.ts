import Vue, { DirectiveOptions } from 'vue';

Vue.directive('dnd-value', (() => {
  return {
    bind: (el: any, node: any) => {
      var data = node.value;
      el.addEventListener('click', () => {
        data.action(data.value);
      });
    },
    unbind: (el: any, node: any) => {
      el.removeEventListener('click', () => {});
    }
  };
})());
