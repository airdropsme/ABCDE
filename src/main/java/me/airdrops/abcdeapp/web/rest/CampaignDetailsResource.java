package me.airdrops.abcdeapp.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * CampaignDetails controller
 */
@RestController
@RequestMapping("/api/campaign-details")
public class CampaignDetailsResource {

    private final Logger log = LoggerFactory.getLogger(CampaignDetailsResource.class);

    /**
    * GET getCampaignDetails
    */
    @GetMapping("/get-campaign-details")
    public String getCampaignDetails() {
        return "getCampaignDetails";
    }

}
