package com.devsuperior.dsmeta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SmsService {

	@Autowired
	private SaleRepository saleRepository;

	public void sendSms(Long saleId) {

		Sale sale = saleRepository.findById(saleId).get();
		
		String date = sale.getDate().getMonthValue() + "/" + sale.getDate().getYear();
		
		String msg = "O vendedor " + sale.getSellerName() + " foi destaque em " + date
			    + " com um total de R$ " + String.format("%.0f", sale.getAmount());
		
		Twilio.init("AC267921cd88ed16f67de59c51ba4e0724", "be800e2c259c31604577ab52851e336d");
		
		PhoneNumber to = new PhoneNumber("+5512996470064");
		PhoneNumber from = new PhoneNumber("+19894743376");

		Message message = Message.creator(to, from, msg).create();
		
		System.out.println(message.getSid());
		
	}
}