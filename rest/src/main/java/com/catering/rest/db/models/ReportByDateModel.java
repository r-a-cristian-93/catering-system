package com.catering.rest.db.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="orders_report_placement_date")
@SecondaryTable(name="orders_report_due_date")
@SecondaryTable(name="orders_report_shipping_date")
@SecondaryTable(name="orders_report_cancel_date")
@Getter @Setter
@DynamicUpdate
@DynamicInsert
public class ReportByDateModel extends SortableModel {
    @Id
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date")
	private Date date;

	@Column(name="count")
	private Integer count;

	protected ReportByDateModel() {}

	static {
		clazz = ReportByDateModel.class;
	}
}
