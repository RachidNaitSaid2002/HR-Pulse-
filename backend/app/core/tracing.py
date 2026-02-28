import os
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import SERVICE_NAME, Resource

def setup_tracing(service_name: str):
    # Retrieve endpoint from env or fallback to jaeger container name
    endpoint = os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT", "http://jaeger:4317")
    
    # Configure Resource with service name
    resource = Resource(attributes={
        SERVICE_NAME: service_name
    })

    # Set up Tracer Provider
    provider = TracerProvider(resource=resource)
    
    # Configure OTLP Exporter (gRPC)
    processor = BatchSpanProcessor(OTLPSpanExporter(endpoint=endpoint, insecure=True))
    provider.add_span_processor(processor)

    # Set as global tracer provider
    trace.set_tracer_provider(provider)
    
    return trace.get_tracer(__name__)

# Create a global tracer instance
tracer = trace.get_tracer("hr-pulse-backend")
