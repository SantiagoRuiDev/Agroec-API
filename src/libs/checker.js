import * as profileModel from '../models/profile.model.js';

// Obtiene el perfil del usuario que se envia por parametro.
// Si retorna true es porque tiene un perfil del tipo preguntado.
export const isFarmerProfile = async (uuid) => {
  try {
    const profile = await profileModel.getFarmerProfileByUser(uuid);
    
    if(profile){
      return true
    }else {
      return false
    }
  } catch (error) {
    return false;
  }
};

export const isBuyerProfile = async (uuid) => {
  try {
    const profile = await profileModel.getBuyerProfileByUser(uuid);
    
    if(profile){
      return true
    }else {
      return false
    }
  } catch (error) {
    return false;
  }
};

export const isAssociationAgricultural = async (uuid) => {
  try {
    const profile = await profileModel.getAssociationAgriculturalProfileByUser(uuid);
    
    if(profile){
      return true
    }else {
      return false
    }
  } catch (error) {
    return false;
  }
};

export const isMerchantAgrochemical = async (uuid) => {
  try {
    const profile = await profileModel.getMerchantAgrochemicalProfileByUser(uuid);
    
    if(profile){
      return true
    }else {
      return false
    }
  } catch (error) {
    return false;
  }
};

export const isMerchant = async (uuid) => {
  try {
    const profile = await profileModel.getMerchantProfileByUser(uuid);
    
    if(profile){
      return true
    }else {
      return false
    }
  } catch (error) {
    return false;
  }
};

export const getType = async (uuid) => {
  try {
    const profile = await profileModel.getProfileType(uuid);
    
    if(profile){
      return profile.tipo_perfil
    }
  } catch (error) {
    return "Comerciante";
  }
}