package com.abmApi.abmApi.entities;

public class EntityStats {
    private long total;
    private long deleted;
    private long active;

    public EntityStats(long total, long deleted, long active) {
        this.total = total;
        this.deleted = deleted;
        this.active = active;
    }

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public long getDeleted() {
		return deleted;
	}

	public void setDeleted(long deleted) {
		this.deleted = deleted;
	}

	public long getActive() {
		return active;
	}

	public void setActive(long active) {
		this.active = active;
	}
}
