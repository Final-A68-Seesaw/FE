import React from 'react'
import { StepBar } from '../components/StepBar'

import { history } from '../redux/configStore'

const SignupCharacter = () => {
    return (
        <div>
            <StepBar shape = "step3"/>
            
            <button onClick={() => history.push('/main')}>몰라</button>
        </div>
    )
}

export default SignupCharacter