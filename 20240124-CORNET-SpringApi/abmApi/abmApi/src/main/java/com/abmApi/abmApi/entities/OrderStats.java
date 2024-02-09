package com.abmApi.abmApi.entities;

public class OrderStats {
    private long total;
    private long canceled;
    private long pending;
    private long completed;
    
	public OrderStats(long total, long canceled, long pending, long completed) {
		this.total = total;
		this.canceled = canceled;
		this.pending = pending;
		this.completed = completed;
	}
	
	public long getTotal() {
		return total;
	}
	public void setTotal(long total) {
		this.total = total;
	}
	public long getCanceled() {
		return canceled;
	}
	public void setCanceled(long canceled) {
		this.canceled = canceled;
	}
	public long getPending() {
		return pending;
	}
	public void setPending(long pending) {
		this.pending = pending;
	}
	public long getCompleted() {
		return completed;
	}
	public void setCompleted(long completed) {
		this.completed = completed;
	}
    
}
