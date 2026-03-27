package LRUcache.project.controller;

import LRUcache.project.dto.CacheStateDTO;
import LRUcache.project.service.CacheService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cache")
@CrossOrigin(origins = "http://localhost:5173")
public class CacheController {

    private final CacheService cacheService;

    public CacheController (CacheService cacheService){
        this.cacheService = cacheService;
    }

    @GetMapping("/{key}")
    public CacheStateDTO get(@PathVariable String key){
        return cacheService.get(key);
    }

    @PutMapping("/{key}")
    public CacheStateDTO put(@PathVariable String key, @RequestParam String value){
        return cacheService.put(key, value);
    }

    @DeleteMapping("/{key}")
    public CacheStateDTO delete(@PathVariable String key){
        return cacheService.delete(key);
    }

    @GetMapping("/state")
    public CacheStateDTO getState() {
        return cacheService.getState();
    }

    @DeleteMapping
    public CacheStateDTO clear() {
        return cacheService.clear();
    }

}
