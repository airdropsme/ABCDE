package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the CampaignDetails REST controller.
 *
 * @see CampaignDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class CampaignDetailsResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        CampaignDetailsResource campaignDetailsResource = new CampaignDetailsResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(campaignDetailsResource)
            .build();
    }

    /**
    * Test getCampaignDetails
    */
    @Test
    public void testGetCampaignDetails() throws Exception {
        restMockMvc.perform(get("/api/campaign-details/get-campaign-details"))
            .andExpect(status().isOk());
    }

}
