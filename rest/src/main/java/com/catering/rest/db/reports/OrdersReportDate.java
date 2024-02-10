package com.catering.rest.db.reports;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.catering.rest.db.models.ReportByDateModel;

public interface OrdersReportDate extends JpaRepository<ReportByDateModel, Date> {
	@Query(value = "CALL orders_report_placement_date(?1, ?2);", nativeQuery = true)
	List<ReportByDateModel> placementDate(Date startDate, Date endDate);

	@Query(value = "CALL orders_report_due_date(?1, ?2);", nativeQuery = true)
	List<ReportByDateModel> dueDate(Date startDate, Date endDate);

	@Query(value = "CALL orders_report_cancel_date(?1, ?2);", nativeQuery = true)
	List<ReportByDateModel> cancelDate(Date startDate, Date endDate);

	@Query(value = "CALL orders_report_shipping_date(?1, ?2);", nativeQuery = true)
	List<ReportByDateModel> shippingDate(Date startDate, Date endDate);
}
