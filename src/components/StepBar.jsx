import React from "react";
import styled from "styled-components";

export const StepBar=({shape, children, ...rest}) => {
    switch(shape) {
        case "step1":
            return(
                <Step_Bar>
                    <Step_Text>Step1</Step_Text>
                    <Stepbar_1/>
                    <Stepbar_base/>
                </Step_Bar>
            )
        case "step2":
            return(
                <Step_Bar>
                    <Step_Text>Step2</Step_Text>
                    <Stepbar_2/>
                    <Stepbar_base/>
                </Step_Bar>
            )
        case "step3":
            return(
                <Step_Bar>
                    <Step_Text>Step3</Step_Text>
                    <Stepbar_3/>
                    <Stepbar_base/>
                </Step_Bar>
            )
    }
    
}

const Step_Bar = styled.div`
    margin: auto;
    width: 20rem;
    height: 2.94rem;
    padding-bottom: 2rem;
`
const Step_Text = styled.div`
    width: 13.4%;
    height: 68.09%;
    color: #ff4e4e;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.61rem;
`
const Stepbar_base = styled.div`
    width: 100%;
    height: 8.51%;
    background-color: #dfdfdf;
    border-radius: 1.25rem;
`
const Stepbar_1 = styled.div`
    width: 33.33%;
    height: 7%;
    border-radius: 1.25rem;
    background-color: #ff4e4e;
`

const Stepbar_2 = styled.div`
    width: 66.67%;
    height: 7%;
    border-radius: 1.25rem;
    background-color: #ff4e4e;
`
const Stepbar_3 = styled.div`
    width: 100%;
    height: 7%;
    border-radius: 1.25rem;
    background-color: #ff4e4e;
`