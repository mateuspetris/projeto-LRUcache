package LRUcache.project.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LRUcache {

    private final int capacity;
    private final Map<String, Node> map;

    private final Node head;
    private final Node tail;

    // args(capacity) no all args
    public LRUcache(int capacity){
        this.capacity = capacity;
        this.map = new HashMap<>();

        this.head = new Node("HEAD", "");
        this.tail = new Node("TAIL", "");

        head.next = tail;
        tail.prev = head;
    }

    // metodo de pegar o valor de um nó
    public String get(String key){
        if (!map.containsKey(key)) {
            return null;
        }
        Node node = map.get(key);
        moveToFront(node);
        return node.value;
    }

    // metodo de colocar um nó(key e value) no topo da lista
    public String put(String key, String value){
        String evicted = null;
        if (!map.containsKey(key)) {
            Node node = map.get(key);
            node.value = value;
            moveToFront(node);
        }
        else {
            if (map.size() >= capacity){
                evicted = evict();
            }
            Node node = new Node(key, value);
            map.put(key, node);
            addToFront(node);
        }
        return evicted;
    }

    //  metodo que deleta um nó da lista
    public boolean delete (String key) {
        if (!map.containsKey(key)){
            return false;
        }
        Node node = map.get(key);
        removeNode(node);
        map.remove(key);
        return true;
    }
    // limpar lista.
    public void clear(){
        map.clear();
        head.next = tail;
        tail.prev = head;
    }
    // percorre a lista e retorna uma lista String com cada nó (value, key)
    public List<String[]> getState() {
        List<String[]> state = new ArrayList<>();
        Node current = head.next;
        while (current != tail) {
            state.add(new String[]{current.key, current.value});
            current = current.next;
        }
        return state;
    }

    public int size(){
        return map.size();
    }

    public int capacity(){
        return capacity;
    }

    private void addToFront (Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node){
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToFront(Node node){
        removeNode(node);
        addToFront(node);
    }

    private String evict(){
        Node lru = tail.prev;
        removeNode(lru);
        map.remove(lru.key);
        return lru.key;
    }

}
