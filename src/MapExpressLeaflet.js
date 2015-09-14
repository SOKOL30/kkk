L.MapExpressLeaflet = {
    Version: '0.0.1',
    
    controls: {},
    
    data:{},
    
    geo:{},
    
    utils:{},
	
	mapping:{}
};

if(typeof window !== 'undefined' && window.L){
  window.L.MapExpressLeaflet = L.MapExpressLeaflet;
}