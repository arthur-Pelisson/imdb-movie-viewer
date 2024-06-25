const getStorageName = () => {
    return "HamsterQuery";
}

const getDefaultCacheJsonRequest = () => {
    return {
        "get": [],
        "post": [],
        "put": [],
        "delete": []
    }
}

const getDefaultCache = () => {
    return JSON.parse(localStorage.getItem(getStorageName()));
}

const setDefaultCache = () => {
    localStorage.setItem(getStorageName(), JSON.stringify({}))
}

// Fonction pour gérer le cache des requêtes
const cachedRequest = (params) => {
    if (params.cacheKey === undefined || params.cacheKey === "" || params.cacheKey === null) return;
    if (getDefaultCache() == null) setDefaultCache();
    params.data = params.data ?? '';
    let cache = getCacheRequest(params, true);
    if (cache !== null && !cacheCheck(params)) {
      return cache.data;
    }
    return false;
} 

//fonction pour mettre en cache
const setCacheRequest = async (params, data) => { 
    let timeCacheOut = 1440; //timeCacheOut default 24h
    if (params.timeCacheOut !== undefined) timeCacheOut = params.timeCacheOut;
    timeCacheOut = timeCacheOut * 60 * 1000; //convert minutes to milliseconds

    const defaultCache = getDefaultCache();
    const cacheKey = params.cacheKey;
    // check for and remove any duplicates before adding new request to cache
    await deleteDoubleCacheRequest(params);
    if (!defaultCache?.[cacheKey]) {
      defaultCache[cacheKey] = getDefaultCacheJsonRequest();
    }
    const toCache = {
      url: params.url,
      data: data,
      dataSend: params.data,
      timeCacheOut: new Date().getTime() + timeCacheOut,
      countCall : 1
    };
    defaultCache[cacheKey][params.type].push(toCache);
    updateCacheRequest(defaultCache);
  };

//fonction pour récupérer le cache
const getCacheRequest = (params, count = false) => {
    const cacheKey = params.cacheKey;
    const cache = getDefaultCache();
    if (cache?.[cacheKey]) {
        const cacheRequest = cache[cacheKey];
        const find = cacheRequest[params.type].find(
            (request) =>
              request.url === params.url &&
              JSON.stringify(request.dataSend) === JSON.stringify(params.data)
          );
          if (find === undefined) return false;
          if (count) {
            find.countCall++;
            updateCacheRequest(cache);
          }
          return find;
        }
        return null;
}


//fonction pour supprimer les doublons dans le cache si il y en a, par prévention
const deleteDoubleCacheRequest = async (params) => {
    const cacheKey = params.cacheKey;
    const cache = getDefaultCache();
    // console.log(cache);
  if (cache?.[cacheKey]) {
    const cacheRequest = cache[cacheKey];
    const urlToDelete = params.url;
    const dataToDelete = JSON.stringify(params.data);
    for (let i = 0; i < cacheRequest[params.type].length; i++) {
        if (cacheRequest[params.type][i].url === urlToDelete && JSON.stringify(cacheRequest[params.type][i].dataSend) === dataToDelete) {
            cacheRequest[params.type].splice(i, 1);
        }
    }
    cache[cacheKey] = cacheRequest;
    await updateCacheRequest(cache);
    return true;
  }
  return null;
}

//fonction pour supprimer un élément du cache
const deleteCacheRequest = (params) => {
    // console.log("deleteCacheRequest");
    // console.log("params : ", params);
    const cacheKey = params.cacheKey;
    let cache = getDefaultCache();
    if (cache?.[cacheKey]) {
        const cacheRequest = cache[cacheKey];
        for (const requet of cacheRequest[params.type]) {
            if (requet.dataSend !== params.data) continue; 
                console.log("DELETE CACHE");
                cacheRequest[params.type] = cacheRequest[params.type].filter((item) => item !== requet);
                cache[cacheKey] = cacheRequest;
                updateCacheRequest(cache);
                return true;
        }
    } 
    return null;
}

//fonction pour mettre à jour le cache
const updateCacheRequest = (json) => {
    if (json !== null) {
        localStorage.setItem(getStorageName(), JSON.stringify(json));
    }
}

//fonction pour check les possible recontruction du cache
const cacheCheck = (params) => {
    // console.log("params cacheCheck : ", params);
    const validatorCache = check;
    validatorCache.setCache(getCacheRequest(params));
    // const cache = getCacheRequest(params);
    if (validatorCache.cacheTimeOut(params)) return true;
    if (validatorCache.cacheCountCall(params)) return true;
    return false;
}


const check = {
    setCache(cache) {
        this.cache = cache;
    },
    cacheTimeOut(params) {
        let time = this.cache.timeCacheOut;
        if (time < new Date().getTime()) {
            deleteCacheRequest(params);
            return true;
        }
        return false;
    },
    cacheCountCall(params) {
        // set limiteCall to 10 if undefined
        params.limiteCall = params.limiteCall ?? 10;
        // console.log("LIMITE CALL : ", params.limiteCall);
        if (params.limiteCall < this.cache.countCall) {
            deleteCacheRequest(params);
            return true;
        }
        return false;
    }
}

//fonction pour vider le cache // A utiliser avec précaution
const clearAll = () => {
    localStorage.clear();
}

export { setCacheRequest, getCacheRequest, clearAll, cachedRequest };