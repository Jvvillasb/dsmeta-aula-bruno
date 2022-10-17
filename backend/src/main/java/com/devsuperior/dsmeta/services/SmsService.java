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
		
		Twilio.init("cred1", "cred2");
		
		PhoneNumber to = new PhoneNumber("cred3");
		PhoneNumber from = new PhoneNumber("cred4");

		Message message = Message.creator(to, from, msg).create();
		
		System.out.println(message.getSid());
		
	}
}