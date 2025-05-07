import {render,screen} from '@testing-library/react';
import Header from "../src/Header"


test("Sample Test", ()=>{ //sample test
    expect(true).toBe(true)
})

//test 1
test("rendering header component", ()=>{
    render(<Header/>)
    const linkElement = screen.getByLabelText(/add task/);
    expect(linkElement).toBeInTheDocument();
})