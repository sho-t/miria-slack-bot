import {Miria} from './miria';

global.doPost = function(e) {
  const miria = new Miria();
  miria.doResponse(e);
};

