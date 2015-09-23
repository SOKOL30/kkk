L.MapExpress = {
    Version: '0.0.1',
    
    controls: {},
    
    data:{},
    
    geo:{},
    
	layers {},
	
    utils:{},
	
	mapping:{}
};

if(typeof window !== 'undefined' && window.L){
  window.L.MapExpress = L.MapExpress;
}