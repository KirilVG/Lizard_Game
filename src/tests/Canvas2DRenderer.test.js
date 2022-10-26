import Canvas2DRenderer from "../Components/Canvas2DRenderer";

const createMockedCanvas = () => {
    return{
        getContext: function(context) {
            switch(context) {
                case "2d":{
                    return {
                        fillStyle: function(){},
                        strokeStyle: function(){},
                        fillRect: function(){},
                        fill: function(){},
                        setTransform: function(){},
                        resetTransform: function(){},
                    };
                }
                default:
                    return undefined;
            }
        }
    }
}

it("Check if mocked canvas was mocked correctly",()=>{
    const mockedCanvas=createMockedCanvas();

    const renderer=new Canvas2DRenderer(mockedCanvas);

    expect(renderer.ctx).not.toBe(undefined);
})