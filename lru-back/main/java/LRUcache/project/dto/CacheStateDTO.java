package LRUcache.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class CacheStateDTO {
    private List<CacheEntryDTO> items;
    private int size;
    private int capacity;
    private String lastEvicted;
    private String lastOperation;
}
