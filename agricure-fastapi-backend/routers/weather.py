from fastapi import APIRouter

router = APIRouter()

@router.get("/risk")
async def get_weather_risk(lat: float, lon: float):
    # TODO: Connect to real weather API (OpenWeatherMap) and run ML prediction for risk score
    return {
        "risk_level": "High",
        "primary_threat": "Locust Swarm",
        "advice": "High winds expected from the east. Prepare protective nets for the crops.",
        "lat": lat,
        "lon": lon
    }
