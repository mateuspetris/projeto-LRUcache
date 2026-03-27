package LRUcache.project.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CacheEntryDTO {
    private String key;
    private String value;
    private int position;
}
