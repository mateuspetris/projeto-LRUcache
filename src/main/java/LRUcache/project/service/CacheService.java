package LRUcache.project.service;

import LRUcache.project.core.LRUcache;
import LRUcache.project.dto.CacheEntryDTO;
import LRUcache.project.dto.CacheStateDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CacheService {

    private final LRUcache cache;

    public CacheService(){
        this.cache = new LRUcache(5);
    }

    public CacheStateDTO get(String key) {
        String value = cache.get(key);
        String operation = value != null ? "GET HIT" : "GET MISS";
        return buildState(operation, null);
    }

    public CacheStateDTO put(String key, String value){
        String evicted = cache.put(key, value);
        return buildState("PUT", evicted);
    }

    public CacheStateDTO delete(String key, String value){
        cache.delete(key);
        return buildState("DELETE", null);
    }

    public CacheStateDTO clear(){
        cache.clear();
        return buildState("CLEAR", null);
    }

    private CacheStateDTO buildState(String operation, String evicted){
        List<String[]> raw = cache.getState();
        List<CacheEntryDTO> items = new ArrayList<>();

        for (int i = 0; i < raw.size(); i++) {
            items.add(new CacheEntryDTO(raw.get(i)[0], raw.get(i)[1], i));
        }
        return new CacheStateDTO(items, cache.size(), cache.capacity(), evicted, operation);
    }
}
