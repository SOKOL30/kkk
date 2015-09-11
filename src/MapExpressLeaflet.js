L.MapExpressLeaflet = {
    Version: '0.0.1',
    
    Services: {},
    
    Mapping:{},
    
    Controls:{},
    
    Utils:{}
};

if(typeof window !== 'undefined' && window.L){
  window.L.MapExpressLeaflet = L.MapExpressLeaflet;
}