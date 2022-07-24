import { describe, it, expect, test } from "vitest";

import { mount } from "@vue/test-utils";
import Babysitter from "../Babysitter.vue";

describe("Babysitter", () => {

  const wrapper = mount(Babysitter);
  const startTimeInput = wrapper.find('#startTime');
  const bedTimeInput = wrapper.find('#bedTime');
  const endTimeInput = wrapper.find('#endTime'); 

  test('Start time cant be before 5:00 p.m. or after 4:00 a.m.', () => { 
    startTimeInput.setValue("16:00");
    endTimeInput.setValue("4:00");
    wrapper.find('#calcPayBtn').trigger('click');
  })

  test('End time cant be after 4:00 a.m. or before 5:00 p.m.', () => { 
    startTimeInput.setValue("17:00");
    endTimeInput.setValue("5:00");
    wrapper.find('#calcPayBtn').trigger('click');
  })

  test('End time cant be before start time', () => { 
    startTimeInput.setValue("20:00");
    endTimeInput.setValue("18:00");
    wrapper.find('#calcPayBtn').trigger('click');
     
  })

  test('Bedtime must fall between start time and end time', () => { 
    startTimeInput.setValue("20:00");
    bedTimeInput.setValue("17:00");
    endTimeInput.setValue("4:00");
    wrapper.find('#calcPayBtn').trigger('click');
  })


  test('5 p.m. to 4 a.m., 8.p.m. bedtime', () => {
    startTimeInput.setValue("17:00");
    bedTimeInput.setValue("20:00");
    endTimeInput.setValue("4:00");
    wrapper.find('#calcPayBtn').trigger('click');

    expect(wrapper.find('#payField').element.innerHTML).equals('$ 132');

  })

  test('5 p.m. to 4 a.m., no bedtime set', () => {

    startTimeInput.setValue("17:00");
    bedTimeInput.setValue("20:00");
    endTimeInput.setValue("4:00");
    wrapper.find('#calcPayBtn').trigger('click');

    expect(wrapper.find('#payField').element.innerHTML).equals('$ 148');

  })


  test('12 a.m. to 4 a.m.', () => {

    startTimeInput.setValue("0:00");
    endTimeInput.setValue("4:00");
    wrapper.find('#calcPayBtn').trigger('click');

    expect(wrapper.find('#payField').element.innerHTML).equals('$ 64');

  })

  test('5 p.m. to 6 p.m.', () => {
    startTimeInput.setValue("17.00");
    endTimeInput.setValue("18.00");
    wrapper.find('#calcPayBtn').trigger('click');

    expect(wrapper.find('#payField').element.innerHTML).equals('$ 12');

  })
});